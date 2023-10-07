import { Database } from "@/lib/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
//import { QuestionTypes, QuizAnalytics } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const sid = searchParams.get("sid");

  if (!sid) {
    return new NextResponse(
      JSON.stringify({
        error: "Sid not provided",
      }),
      { status: 400 }
    );
  }

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const quizScheduleRes = await supabase
    .schema("quizzy")
    .from("QuizSchedule")
    .select("*,Quiz(*)")
    .eq("id", sid)
    .single();

  if (quizScheduleRes.error) {
    JSON.stringify({
      ...quizScheduleRes,
    });
  }
  //@ts-ignore
  if (quizScheduleRes.data.Quiz.id === null) {
    return JSON.stringify({
      error: "data not found",
    });
  }

  const res = await supabase
    .schema("quizzy")
    .from("QuizQuestions")
    .select("Question(*)")
    //@ts-ignore
    .eq("quizId", quizScheduleRes.data.Quiz.id);

  return new NextResponse(
    JSON.stringify({
      ...res,
    }),
    { status: res.status, headers: { "Content-Type": "application/json" } }
  );
}
