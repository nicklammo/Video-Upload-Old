import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { formatString } from "@/app/lib/strings/lib";
import prisma from "@/app/db/prisma";

export async function GET(req: NextRequest, { params }: { params: { slug: string; }}) {
  try {
    const username = z.string().regex(/^[a-zA-Z0-9_]+$/).parse(params.slug);
    const formattedUsername = formatString(username).upperCase;
    const user = await prisma.user.findFirstOrThrow({
      where: {
        username: formattedUsername,
      },
      select: { 
        username: true,
      }
    });
    console.log(user);
  } catch (e) {
    return NextResponse.json({message: 'User not found'});
  }
  return NextResponse.json({message: 'User found'});
}