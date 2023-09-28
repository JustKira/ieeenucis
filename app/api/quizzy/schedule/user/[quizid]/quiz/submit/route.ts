import { Database } from "@/lib/database";
import { QuestionTypes, QuizAnswer } from "@/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { object, number } from "zod";
export const dynamic = "force-dynamic";
export async function POST(
  request: NextRequest,
  { params }: { params: { quizid: string } }
) {
  const json = (await request.json()) as any;
  const body = Object.values(json) as QuizAnswer;
  const searchParams = request.nextUrl.searchParams;

  const quizId = searchParams.get("quizId");

  if (!quizId) {
    return new NextResponse(
      JSON.stringify({
        error: "QuizId not provided ?quizId={number}",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

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

  const quizRes = await supabase
    .schema("quizzy")
    .from("QuizQuestions")
    .select("Question(*)")
    .eq("quizId", quizId);

  if (quizRes.error) {
    console.log(quizRes.error);
    return new NextResponse(
      JSON.stringify({
        ...quizRes,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: quizRes.status,
      }
    );
  }

  console.log(quizRes.data);

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

  let totalScore = 0;
  quizRes.data.forEach(({ Question }) => {
    console.log("Loop");
    if (!Question) return;
    //@ts-ignore
    const _q: QuestionTypes = Question.questionObject.object as any;
    //@ts-ignore
    const _qScore: number = Number(Question.questionObject.score) as any;

    console.log(_qScore);
    const _qId: number = Question.id;
    body.forEach((answer) => {
      if (answer.id === _qId && _q.type === answer.type) {
        console.log("Loop");
        if (_q.type === "MCQ" && answer.type === "MCQ") {
          console.log("MCQ");
          if (answer.answer && _q.choices[answer.answer].isAnswer) {
            totalScore += _qScore;
            console.log(totalScore);
          }
        }

        if (_q.type === "TF" && answer.type === "TF") {
          console.log("TF");
          if (_q.isAnswer === answer.answer) {
            totalScore += _qScore;
          }
        }
        if (_q.type === "MULTI" && answer.type === "MULTI") {
          let correctAnswersNum = 0;

          _q.choices.map((q) =>
            q.isAnswer === true ? ++correctAnswersNum : null
          );

          const incrementScore = _qScore * (1 / correctAnswersNum);
          console.log(incrementScore);
          answer.answers.map((a, id) => {
            if (a === 1 && _q.choices[id].isAnswer) {
              totalScore += incrementScore;
            } else if (a === 1 && !_q.choices[id].isAnswer) {
              totalScore -= incrementScore;
            }
          });
        }
      }
    });
  });

  console.log(totalScore.toFixed(2));
  // for (const question of quizRes.data) {
  //   //@ts-ignore
  //   console.log(question);
  //   const _q: QuestionTypes = question.Question?.questionObject.object as any;
  //   console.log(_q.type);
  //   for (const answer of body) {
  //   }
  // }

  if (totalScore < 0) {
    totalScore = 0;
  }
  console.log(totalScore.toFixed(2));
  quizRes.data.map((d, id) => d.Question);
  const res = await supabase
    .schema("quizzy")
    .from("UserQuiz")
    .update({
      submitted: true,
      answers: body,
      autoGrade: Number(totalScore.toFixed(2)),
    })
    .eq("id", Number(params.quizid))
    .eq("userId", userRes.data.id);

  return new NextResponse(
    JSON.stringify(
      res.error
        ? {
            ...res,
          }
        : null
    ),
    {
      headers: { "Content-Type": "application/json" },
      status: res.status,
    }
  );
}
