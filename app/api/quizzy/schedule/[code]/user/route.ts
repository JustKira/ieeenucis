import { Database } from "@/lib/database";
import { genUniqueId } from "@/lib/utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    //console.log(userError.message);
    return new NextResponse(
      JSON.stringify({
        error: userError.message,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 404,
      }
    );
  }

  const userRes = await supabase
    .schema("public")
    .from("User")
    .select()
    .eq("uid", user?.id || -1)
    .single();

  if (userRes.error) {
    console.log(userRes.error);
    return new NextResponse(
      JSON.stringify({
        ...userRes,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: userRes.status,
      }
    );
  }

  const quizScheduleRes = await supabase
    .schema("quizzy")
    .from("QuizSchedule")
    .select()
    .eq("code", params.code)
    .single();

  if (quizScheduleRes.error) {
    console.log(quizScheduleRes.error);
    return new NextResponse(
      JSON.stringify({
        ...quizScheduleRes,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: quizScheduleRes.status,
      }
    );
  }

  const res = await supabase
    .schema("quizzy")
    .from("UserQuiz")
    .insert({
      answers: {},
      autoGrade: 0,
      manualGrade: 0,
      attended: false,
      userId: userRes.data.id,
      quizId: quizScheduleRes.data.quizId,
      quizScheduleId: quizScheduleRes.data.id,
    })
    .select()
    .single();
  console.log(res?.error);
  return new NextResponse(
    JSON.stringify({
      ...res,
    }),
    {
      headers: { "Content-Type": "application/json" },
      status: res.status,
    }
  );
}
