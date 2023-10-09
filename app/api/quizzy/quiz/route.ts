import { Database } from "@/lib/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
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
  const { quizName, totalMarks, questionsIds } = (await request.json()) as {
    quizName: string;
    totalMarks: number;
    questionsIds: number[];
  };
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const quizRes = await supabase
    .schema("quizzy")
    .from("Quiz")
    .insert({ quizName, totalMarks })
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

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const qid = searchParams.get("qid");
  const supabase = createRouteHandlerClient<Database>({ cookies });
  if (!qid) {
    return new NextResponse(
      JSON.stringify({
        error: "not QuestionId was provided in search params add qid={id}",
      }),
      { status: 404 }
    );
  }
  const res = await supabase
    .schema("quizzy")
    .from("Quiz")
    .delete()
    .eq("id", Number(qid));

  return new NextResponse(
    res.error
      ? JSON.stringify({
          ...res,
        })
      : null,
    { status: res.status }
  );
}
