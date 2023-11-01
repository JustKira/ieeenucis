import { Database } from "@/lib/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const quizRes = await supabase
    .schema("quizzy")
    .from("UserQuiz")
    .select("*,QuizSchedule(*,Quiz(*))")
    .eq("quizScheduleId", params.id);

  if (quizRes.error) {
    return new NextResponse(
      JSON.stringify({
        ...quizRes.error,
      }),
      { status: quizRes.status }
    );
  }

  const allIds = quizRes.data.map((d) => d.userId);
  const { data: users } = await supabase
    .schema("public")
    .from("User")
    .select("*")
    .in("id", allIds);

  const cleanedData = quizRes.data.map((d) => {
    let _user = users?.find((u) => u.id === d.userId);

    if (_user) {
      return { ...d, User: _user };
    }

    return [];
  });

  return new NextResponse(
    JSON.stringify({
      data: Object.values(cleanedData),
    }),
    { status: quizRes.status }
  );
}
