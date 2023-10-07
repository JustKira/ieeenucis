import { Database } from "@/lib/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { QuestionTypes, QuizAnalytics } from "@/types";

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

  const res = await supabase
    .schema("quizzy")
    .from("QuizScheduleAnalytics")
    .select("*")
    .eq("quizScheduleId", sid)
    .single();

  return new NextResponse(
    JSON.stringify({
      ...res,
    }),
    { status: res.status, headers: { "Content-Type": "application/json" } }
  );
}

export async function POST(request: NextRequest) {
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
  const schedulesRes = await supabase
    .schema("quizzy")
    .from("QuizSchedule")
    .select("id,Quiz(*)")
    .eq("id", sid)
    .single();

  if (schedulesRes.error) {
    return new NextResponse(
      JSON.stringify({
        ...schedulesRes,
      })
    );
  }
  if (!schedulesRes.data.Quiz?.id) {
    return new NextResponse(
      JSON.stringify({
        error: "Quiz not found",
      }),
      { status: 400 }
    );
  }
  const usersRes = await supabase
    .schema("quizzy")
    .from("UserQuiz")
    .select("*")
    .eq("submitted", true)
    .eq("quizScheduleId", schedulesRes.data.id);

  const quizRes = await supabase
    .schema("quizzy")
    .from("QuizQuestions")
    .select("Question(*)")
    .eq("quizId", schedulesRes.data.Quiz.id);
  const analyticObject: QuizAnalytics = [];

  quizRes.data?.forEach(({ Question }) => {
    if (!Question) return;

    //@ts-ignore
    const _q: QuestionTypes = Question.questionObject.object as any;
    const _qId: number = Question.id;
    if (_q.type === "MCQ") {
      analyticObject.push({
        questionId: _qId,
        type: "MCQ",
        correctPerc: 1,
        false: 0,
        true: 0,
      });
    } else if (_q.type === "TF") {
      analyticObject.push({
        questionId: _qId,
        type: "TF",
        correctPerc: 1,
        false: 0,
        true: 0,
      });
    } else if (_q.type === "MULTI") {
      analyticObject.push({
        questionId: _qId,
        type: "MULTI",
        correctPerc: 1,
        false: 0,
        true: 0,
        correctAnswers: _q.choices.map((q: any, id) => {
          return { false: 0, true: 0, percentage: 1 };
        }),
      });
    }
  });

  usersRes.data?.map(async (ur) => {
    quizRes.data?.forEach(({ Question }) => {
      if (!Question) return;

      //@ts-ignore
      const _q: QuestionTypes = Question.questionObject.object as any;

      const _qId: number = Question.id;
      //@ts-ignore
      ur.answers.forEach((answer) => {
        //@ts-ignore
        console.log(ur.answers.length);
        const targetObject = analyticObject.find(
          (item) => item.questionId === _qId
        );
        if (!targetObject) return;

        console.log("x");
        if (
          answer.id === _qId &&
          _q.type === answer.type &&
          targetObject.type === answer.type
        ) {
          if (
            _q.type === "MCQ" &&
            answer.type === "MCQ" &&
            targetObject.type === "MCQ"
          ) {
            if (_q.choices[answer.answer].isAnswer === true) {
              return (targetObject.true = targetObject.true + 1);
            }
            targetObject.false = targetObject.false + 1;
          }

          if (
            _q.type === "TF" &&
            answer.type === "TF" &&
            targetObject.type === "TF"
          ) {
            if (_q.isAnswer === answer.answer) {
              targetObject.true = targetObject.true + 1;
            } else {
              targetObject.false = targetObject.false + 1;
            }
          }
          if (
            _q.type === "MULTI" &&
            answer.type === "MULTI" &&
            targetObject.type === "MULTI"
          ) {
            let correctAnswersNum = 0;
            //@ts-check
            _q.choices.map((q: any) =>
              q.isAnswer === true ? ++correctAnswersNum : null
            );
            const answersLen = _q.choices.length;
            let streak = 0;
            //@ts-ignore
            for (let i = 0; i < answersLen; i++) {
              console.log(answer.answers[i]);

              if (answer.answers[i] == 1 && _q.choices[i].isAnswer) {
                ++targetObject.correctAnswers[i].true;
                ++streak;
              } else if (answer.answers[i] == 1 && !_q.choices[i].isAnswer) {
                ++targetObject.correctAnswers[i].false;
              } else if (
                (answer.answers[i] === null || answer.answers[i] === 0) &&
                _q.choices[i].isAnswer
              ) {
                ++targetObject.correctAnswers[i].false;
              } else if (
                answer.answers[i] === undefined &&
                _q.choices[i].isAnswer
              ) {
                ++targetObject.correctAnswers[i].false;
              } else {
                ++targetObject.correctAnswers[i].true;
                ++streak;
              }
            }

            if (streak === answersLen) {
              ++targetObject.true;
            } else {
              ++targetObject.false;
            }
          }
        }
      });
    });
  });
  analyticObject.forEach((ao) => {
    if (ao.type === "MCQ") ao.correctPerc = ao.true / (ao.true + ao.false);
    if (ao.type === "TF") ao.correctPerc = ao.true / (ao.true + ao.false);
    if (ao.type === "MULTI") {
      ao.correctAnswers.map((ca) => {
        ca.percentage = ca.true / (ca.true + ca.false);
      });

      ao.correctPerc = ao.true / (ao.true + ao.false);
    }
  });
  //@ts-ignore
  const postRes = await supabase
    .schema("quizzy")
    .from("QuizScheduleAnalytics")
    .insert({
      quizScheduleId: Number(sid),
      analytics: analyticObject,
    });

  if (postRes.error) {
    await supabase
      .schema("quizzy")
      .from("QuizScheduleAnalytics")
      .update({
        //@ts-ignore
        analytics: analyticObject,
      })
      .eq("quizScheduleId", sid);
  }

  return new NextResponse(
    JSON.stringify({
      data: { analytic: analyticObject, quiz: analyticObject.length },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
