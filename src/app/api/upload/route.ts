import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import prisma from "@/app/db/prisma";
import { decrypt, encrypt } from "@/auth";
import sharp from "sharp";
import { UserSession } from "@/types";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  try {
    const file = formData.get('image') as File;
    if (file.size === 0 || file.name === 'undefined' || file.name.trim() === '') throw Error('File is empty or has an invalid name');
    const token = formData.get('token') as string;
    if (!token) throw Error('Token is missing');
    const session = await decrypt(token) as UserSession;
    if (!session || !session.user || !session.user.username) throw Error('Invalid session');
    const username = session.user.username;
    const buffer = Buffer.from(await file.arrayBuffer());
    const resizedImageBuffer = await sharp(buffer).resize({ width: 100, height: 100 }).toBuffer();
    const filename = file.name.replaceAll(' ', '_');
    await writeFile(
      path.join(process.cwd(), 'public/avatars/' + filename),
      resizedImageBuffer
    );
    await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        avatar: '/avatars/' + filename,
      },
    });
    const user = {
      email: session.user.username, 
      username: session.user.username, 
      avatar: '/avatars/' + filename,
    }
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    const newSession = await encrypt({user, expires});
    return NextResponse.json({success: true, session: newSession, expires: expires});
  } catch (e) {
    console.log(e);
    return NextResponse.json({success: false});
  }
}
