import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/app/db/prisma";

export async function GET(req: NextRequest, { params }: { params: { slug: string }}) {
  try {
    const cleanVideoId = z.string().regex(/^[0-9]+$/).parse(params.slug);
    const cleanVideoIdInt = parseInt(cleanVideoId);
    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: cleanVideoIdInt,
      },
      include: {
        author: {
          select: {
            username: true,
            avatar: true,
          }
        },
      },
    });

    return NextResponse.json({success: true, video});
  } catch (e) {
    console.error(e);
  }

  return NextResponse.json({success: false});
}