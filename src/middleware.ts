import { updateSession, getSession } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const unauthenticatedRoutes = [
  '/sign-in',
  '/sign-up',
];

const authenticatedRoutes = [
  '/dashboard',
];

export async function middleware(req: NextRequest) {
  const session = await getSession();
  if (session && unauthenticatedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (!session && authenticatedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  return await updateSession(req);
}