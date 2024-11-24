import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/app/db/prisma";
import { decrypt } from "@/auth";
import { UserSession } from "@/types";


export async function POST(req: NextRequest) {
  const session = cookies().get('session')?.value;
  if (!session) return;

  const formData = await req.formData();

  const user = (await decrypt(session) as UserSession)?.user;

  const res = await fetch('http://localhost:3001/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  if (data.videoUrl && data.thumbnailUrl) {
    const video = await prisma.video.create({
      data: {
        authorId: user.id,
        title: 'Untitled',
        url: data.videoUrl,
        thumbnailUrl: data.thumbnailUrl,
      }
    });
    return NextResponse.json({message: 'Successfully uploaded video', videoId: video.id, success: true});
  }

  return NextResponse.json({message: '', success: true});
}