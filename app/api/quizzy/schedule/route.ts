import { Database } from "@/lib/Database";
import { genUniqueId } from "@/lib/utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const res = await supabase.schema("quizzy").from("QuizSchedule").select();

  return new NextResponse(
    JSON.stringify({
      ...res,
    })
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const code = genUniqueId();
  const res = await supabase
    .schema("quizzy")
    .from("QuizSchedule")
    .insert({ ...body, code })
    .select()
    .single();

  return new NextResponse(
    JSON.stringify({
      ...res,
    }),
    { headers: { "Content-Type": "application/json" }, status: res.status }
  );
}
