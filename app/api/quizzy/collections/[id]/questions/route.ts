import { Database } from "@/lib/database";
import { Question } from "@/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const questionsRes = await supabase
    .schema("quizzy")
    .from("QuestionsCollectionQuestions")
    .select("Question(*)")
    .eq("questionsCollectionId", Number(params.id));

  return new NextResponse(
    JSON.stringify({
      ...questionsRes,
    }),
    { status: questionsRes.status }
  );
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { object, question, score } = (await request.json()) as Question;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const questionsRes = await supabase
    .schema("quizzy")
    .from("Question")
    .insert({
      //@ts-ignore
      questionObject: {
        question: question,
        score: score,
        object: object,
      },
    })
    .select()
    .single();

  if (questionsRes.error) {
    return new NextResponse(
      JSON.stringify({
        ...questionsRes,
      }),
      { status: questionsRes.status }
    );
  }
  const questionToCollectionRes = await supabase
    .schema("quizzy")
    .from("QuestionsCollectionQuestions")
    .insert({
      questionId: questionsRes.data.id,
      questionsCollectionId: Number(params.id),
    })
    .select()
    .single();

  return new NextResponse(
    JSON.stringify({
      ...questionToCollectionRes,
    }),
    { status: questionsRes.status }
  );
}
