import prisma from "@/app/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest, { params }: { params: { slug: string; }}) {
  try {
    const videoId = z.number().parse(parseInt(params.slug));
    const comments = await prisma.comment.findMany({
      where: {
        videoId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    return NextResponse.json({success: true, comments});
  } catch (e) {
    return NextResponse.json({success: false});
  }
}