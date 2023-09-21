import { Database } from "@/lib/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { quizid: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log(userError.message);
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

  const res = await supabase
    .schema("quizzy")
    .from("UserQuiz")
    .select("*,QuizSchedule(*)")
    .eq("id", Number(params.quizid))
    .eq("userId", userRes.data.id)
    .limit(1)
    .single();

  return new NextResponse(
    JSON.stringify({
      ...res,
    })
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: { quizid: string } }
) {
  const body = (await request.json()) as QuizAnswers;
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const res = await supabase
    .schema("quizzy")
    .from("UserQuiz")
    .update({ answers: body })
    .eq("id", params.quizid);

  return new NextResponse(
    res.error
      ? JSON.stringify({
          ...res,
        })
      : null,
    {
      headers: { "Content-Type": "application/json" },
      status: res.status,
    }
  );
}
