"use server-only";
import { NextRequest, NextResponse } from "next/server";
import { signUpSchema } from "@/app/lib/zod/schemas";
import prisma from "@/app/db/prisma";
import bcrypt from "bcrypt";
import { encrypt } from "@/auth";

export async function GET() {
  return NextResponse.json({message: "This is working"});
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  let userToken = null;
  try {
    const cleanData = signUpSchema.parse({
      email: data.email,
      username: data.username,
      password: data.password,
    });
    const hash = bcrypt.hashSync(cleanData.password, 10);
    const user = await prisma.user.create({
      data: {
        email: cleanData.email,
        username: cleanData.username,
        password: hash,
        role: 'USER',
      }
    });
    if (!user) throw Error;
    const userData = {
      id: user.id, email: user.email, username: user.username, avatar: user.avatar
    }

    userToken= await encrypt(userData);
  } catch (e) {

    return NextResponse.json({message: 'Failed to create user', success: false});
  }
  return NextResponse.json({message: 'User created successfully', success: true, token: userToken});
}