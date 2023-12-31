import { Database } from "@/lib/database";
import { genUniqueId } from "@/lib/utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
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

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sid = searchParams.get("sid");
  const supabase = createRouteHandlerClient<Database>({ cookies });
  if (!sid) {
    return new NextResponse(
      JSON.stringify({
        error: "not QuestionId was provided in search params add sid={id}",
      }),
      { status: 404 }
    );
  }
  const res = await supabase
    .schema("quizzy")
    .from("QuizSchedule")
    .delete()
    .eq("id", Number(sid));

  return new NextResponse(
    res.error
      ? JSON.stringify({
          ...res,
        })
      : null,
    { status: res.status }
  );
}
