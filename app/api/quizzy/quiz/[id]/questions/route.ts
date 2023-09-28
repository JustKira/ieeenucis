import { Database } from "@/lib/database";
import { Choice, QuestionNoAnswer, Question } from "@/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
function removeAnswer(question: Question): QuestionNoAnswer {
  if (
    question.object.type === "MCQ" ||
    question.object.type === "MULTI" ||
    question.object.type === "TF"
  ) {
    if (question.object.type === "TF") {
      const { isAnswer, ...rest } = question.object;
      return { ...question, object: rest };
    } else {
      const cleanedChoices: Omit<Choice, "isAnswer">[] =
        question.object.choices.map((c) => {
          return { choice: c.choice, id: c.id };
        });
      return {
        ...question,
        object: { ...question.object, choices: cleanedChoices },
      };
    }
  }
  return question;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const res = await supabase
    .schema("quizzy")
    .from("QuizQuestions")
    .select("*,Question(*)")
    .eq("quizId", params.id);

  //clean data

  const cleanedData = res.data?.map((q) => {
    let object: Question = q.Question?.questionObject as any;
    console.log(removeAnswer(object));
    return {
      ...q.Question,
      questionObject: removeAnswer(object),
    };
  });
  console.log(cleanedData);
  return new NextResponse(
    JSON.stringify({
      ...res,
    }),
    { status: res.status }
  );
}
