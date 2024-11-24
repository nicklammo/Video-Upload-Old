import { NextResponse } from "next/server";
import { getSession } from "@/auth";

export async function GET() {
  const session = await getSession();
  if(session === undefined) return NextResponse.json({});
  return NextResponse.json({user: session.user});
}