import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { decrypt } from "@/auth";
import { UserSession } from "@/types";
import prisma from "@/app/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data) throw Error('Form data required');
    const body = z.string().parse(data.body);
    const videoId = z.number().parse(data.videoId);
    const sessionToken = z.string().parse(data.sessionToken);
    const parsed = (await decrypt(sessionToken)) as UserSession;
    if (!parsed) throw Error('Invalid session token');
    const authorId = parsed.user.id;
    const comment = await prisma.comment.create({
      data: {
        authorId: authorId,
        videoId: videoId,
        body: body,
      }
    });
    if (!comment) throw Error('Failed to create comment');
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false });
  }
}