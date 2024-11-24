import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/auth";
import { UserSession } from "@/types";
import prisma from "@/app/db/prisma";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const token = data.token;
    if (!token) throw Error('Token required');
    const user = (await decrypt(token) as UserSession).user;
    if (!user) throw Error('Invalid session');

    const videoId = z.number().parse(data.videoId);
    const authorId = user.id;
    const title = z.string().parse(data.title);
    const description = z.string().parse(data.description);
    
    await prisma.video.update({
      where: {
        id: videoId,
        authorId: authorId,
      }, 
      data: {
        title: title,
        description: description,
      }
    });

    return NextResponse.json({success: true});
  } catch (e) {
    console.error(e);
    return NextResponse.json({success: false});
  }
}