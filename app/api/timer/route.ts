import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const nowTime = new Date().toISOString();
  console.log(body);
  return new NextResponse(JSON.stringify({ now: nowTime }));
}
