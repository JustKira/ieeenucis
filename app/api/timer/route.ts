import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const nowTime = new Date().toISOString();

  return new NextResponse(JSON.stringify({ now: nowTime }));
}
