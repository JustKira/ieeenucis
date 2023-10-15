import { Database } from "@/lib/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const now = new Date();
  const searchParams = request.nextUrl.searchParams;

  const qid = searchParams.get("qid");
  if (!qid) {
    return new NextResponse(
      JSON.stringify({
        error: "Sid not provided",
      }),
      { status: 400 }
    );
  }

  const usersRes = await supabase
    .schema("quizzy")
    .from("UserQuiz")
    .select("*")
    .eq("id", qid)

    .single();

  if (usersRes.data === null)
    return new NextResponse(
      JSON.stringify({
        error: "User not found",
      }),
      { status: 404 }
    );

  const ur = usersRes.data;
  const quizSchedule = await supabase
    .schema("quizzy")
    .from("QuizSchedule")
    .select("*,Quiz(*)")
    .eq("quizId", ur.quizId)
    .single();

  const s = quizSchedule.data;

  if (!s) return;
  if (!s.Quiz) return;

  console.log(usersRes.data);

  const quizRes = await supabase
    .schema("quizzy")
    .from("QuizQuestions")
    .select("Question(*),Quiz(*)")
    .eq("quizId", ur.quizId);

  const examDate = new Date(Date.parse(ur.attendedAt + "Z"));

  const quizDur = s.duration * 60000;

  const isPassed = examDate.getTime() + quizDur - now.getTime();

  console.log(isPassed);
  if (isPassed > 0) return;

  console.log("Calculating");
  let totalScore = 0;
  console.log(ur.userId, ur.quizScheduleId);
  quizRes.data?.forEach(({ Question }) => {
    if (!Question) return;

    //@ts-ignore
    const _q: QuestionTypes = Question.questionObject.object as any;
    //@ts-ignore
    const _qScore: number = Number(Question.questionObject.score) as any;

    const _qId: number = Question.id;

    try {
      //@ts-ignore
      ur.answers.forEach((answer) => {
        if (answer.id === _qId && _q.type === answer.type) {
          try {
            if (_q.type === "MCQ" && answer.type === "MCQ") {
              if (answer.answer !== null) {
                console.log(answer.answer);

                if (_q.choices[answer.answer]?.isAnswer === true) {
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
          } catch (error) {}
        }
      });
    } catch (error) {
      console.log("no answers where found");
    }
  });
  await supabase
    .schema("quizzy")
    .from("UserQuiz")
    .update({ autoGrade: totalScore, submitted: true })
    .eq("userId", ur.userId)
    .eq("quizScheduleId", ur.quizScheduleId)
    .select()
    .single()
    .then((s) => {
      console.log(s.data?.autoGrade, s.data?.userId);
    });
  // console.log(`${totalScore} / ${s.Quiz?.totalMarks}`);

  return new NextResponse(
    JSON.stringify({
      message: "recal",
    })
  );
}
