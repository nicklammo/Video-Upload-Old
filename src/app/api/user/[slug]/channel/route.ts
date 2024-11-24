import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/app/db/prisma";

export async function GET(req: NextRequest, { params } : { params: { slug: string; }}) {
  try {
    const cleanSlug = z.string().regex(/^[a-zA-z0-9_]+$/).parse(params.slug);
    const channel = await prisma.user.findUniqueOrThrow({
      where: {
        username: cleanSlug,
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        videos: {
          orderBy: {
            createdAt: 'desc',
          }
        },
        subscribers: true,
      },
    });

    return NextResponse.json({success: true, channel: channel});
  } catch (e) {
    return NextResponse.json({ success: false })
  }
}