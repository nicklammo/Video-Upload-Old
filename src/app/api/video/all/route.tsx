import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db/prisma";

export async function GET() {

  const videos = await prisma.video.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
        }
      }
    }
  });

  return NextResponse.json({success: true, videos});
};