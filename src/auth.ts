"use server";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtSecret } from "@/env";

type User = { id: number, email: string; username: string, avatar: string | null };

interface UserSession extends JWTPayload {
  user: User,
}

interface ChannelSession extends JWTPayload {
  channel: {
    owner: string;
  }
}

const key = new TextEncoder().encode(jwtSecret);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 hour from now')
    .sign(key)
}

export async function decrypt(input: string) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms:['HS256'],
    });
    return payload;
  } catch {
    return;
  }
}

export async function login(user: User) {

  const expires = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ user, expires });

  cookies().set('session', session, { expires, httpOnly: true, secure: true, sameSite: 'strict', priority: 'high' });
}

export async function logout() {
  return cookies().delete('session');
}

export async function getSession(): Promise<UserSession | undefined> {
  const session = cookies().get('session')?.value;
  if (!session) return undefined;
  return await decrypt(session) as UserSession;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;
  const now = new Date().toISOString();
  if (session.expires && session.expires > now) return true;
  return false;
}

export async function updateSession(request: NextRequest) {
  const session = cookies().get('session')?.value;
  if (!session) return;
  const parsed = await decrypt(session);
  if (!parsed) return;
  
  parsed.expires = new Date(Date.now() + 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires as number,
    secure: true,
    sameSite: 'strict',
    priority: 'high',
  });
  return res;
}