import { Database } from "@/lib/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const schedulesRes = await supabase
    .schema("quizzy")
    .from("QuizSchedule")
    .select("id,Quiz(*)");

  if (schedulesRes.error) {
    return new NextResponse(
      JSON.stringify({
        ...schedulesRes,
      })
    );
  }

  schedulesRes.data.map(async (s) => {
    if (!s.Quiz) return;
    const usersRes = await supabase
      .schema("quizzy")
      .from("UserQuiz")
      .select("*")
      .eq("submitted", true)
      .eq("quizScheduleId", s.id);

    const quizRes = await supabase
      .schema("quizzy")
      .from("QuizQuestions")
      .select("Question(*)")
      .eq("quizId", s.Quiz.id);

    usersRes.data?.map((ur) => {
      let totalScore = 0;
      console.log(ur.userId);
      quizRes.data?.forEach(({ Question }) => {
        if (!Question) return;

        //@ts-ignore
        const _q: QuestionTypes = Question.questionObject.object as any;
        //@ts-ignore
        const _qScore: number = Number(Question.questionObject.score) as any;

        const _qId: number = Question.id;
        //@ts-ignore
        ur.answers.forEach((answer) => {
          if (answer.id === _qId && _q.type === answer.type) {
            if (_q.type === "MCQ" && answer.type === "MCQ") {
              if (answer.answer !== null) {
                console.log(answer.answer);

                if (_q.choices[answer.answer].isAnswer === true) {
                  totalScore += _qScore;
                  console.log(totalScore);
                }
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
              //@ts-check
              _q.choices.map((q: any) =>
                q.isAnswer === true ? ++correctAnswersNum : null
              );
              console.log(correctAnswersNum);
              const incrementScore = _qScore * (1 / correctAnswersNum);
              console.log(incrementScore);
              //@ts-check
              answer.answers.map((a: any, id: any) => {
                if (a === 1 && _q.choices[id].isAnswer) {
                  totalScore += incrementScore;
                } else if (a === 1 && !_q.choices[id].isAnswer) {
                  totalScore -= incrementScore;
                }
              });
            }
          }
        });
        console.log(`${totalScore} / ${s.Quiz?.totalMarks}`);
      });
    });
  });

  return new NextResponse(
    JSON.stringify({
      ...schedulesRes,
    })
  );
}
