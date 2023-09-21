import { Database } from "@/lib/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const quizRes = await supabase.schema("quizzy").from("Quiz").select();

  return new NextResponse(
    JSON.stringify({
      ...quizRes,
    }),
    { status: quizRes.status }
  );
}

export async function POST(request: Request) {
  const { quizName, questionsIds } = (await request.json()) as {
    quizName: string;
    questionsIds: number[];
  };
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const quizRes = await supabase
    .schema("quizzy")
    .from("Quiz")
    .insert({ quizName })
    .select()
    .single();

  if (quizRes.error) {
    return new NextResponse(
      JSON.stringify({
        ...quizRes,
      }),
      { status: quizRes.status }
    );
  }

  const quizQuestionsList = questionsIds.map((id) => {
    return { questionId: id, quizId: quizRes.data.id };
  });

  const res = await supabase
    .schema("quizzy")
    .from("QuizQuestions")
    .insert(quizQuestionsList);

  return new NextResponse(
    JSON.stringify({
      ...res,
    }),
    { status: res.status }
  );
}
