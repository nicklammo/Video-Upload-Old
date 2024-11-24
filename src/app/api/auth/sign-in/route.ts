import { NextRequest, NextResponse } from "next/server";
import { signInSchema } from "@/app/lib/zod/schemas";
import bcrypt from "bcrypt";
import prisma from "@/app/db/prisma";
import { encrypt } from "@/auth";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  let userToken = null;
  try {
    const cleanData = signInSchema.parse({
      username: data.username,
      password: data.password,
    });
    const user = await prisma.user.findFirstOrThrow({
      where: {
        username: cleanData.username,
      },
    });
    if (!user) throw Error;

    const isPasswordValid = bcrypt.compareSync(cleanData.password, user.password);
    if (!isPasswordValid) throw Error;
    
    const userData = { 
      id: user.id,
      email: user.email, 
      username: user.username, 
      avatar: user.avatar,
    };

    userToken = await encrypt(userData);
  } catch (e) {
    return NextResponse.json({message: 'Incorrect username or password', success: false})
  }
  return NextResponse.json({message: 'Signed in successfully', success: true, token: userToken });
}