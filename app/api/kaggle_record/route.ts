import { Database } from "@/lib/Database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const competitionId = searchParams.get("competitionId");
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const query = supabase
    .from("KaggleCompetitionRecord")
    .select()
    .eq("competitionId", competitionId)
    .single();

  const res = await query;

  return new NextResponse(JSON.stringify({ ...res }), { status: res.status });
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const res = await supabase
    .from("KaggleCompetitionLeaderboard")
    .select()
    .eq("completed", false);
  console.log(res.data?.length);
  res.data?.map(async (data) => {
    const res = await fetch(
      `https://www.kaggle.com/api/v1/competitions/${data.competitionId}/leaderboard/view`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(`${data.user}:${data.token}`),
        },
      }
    );

    let record;

    try {
      record = await res.json();
      console.log(record);
    } catch (error) {}
    if (record) {
      console.log(record);
      try {
        await supabase
          .from("KaggleCompetitionRecord")
          .insert({ record: record, competitionId: data.competitionId });
      } catch (error) {
        await supabase
          .from("KaggleCompetitionRecord")
          .update({ record: record });
      }
    }
  });
  return new NextResponse(
    JSON.stringify({
      ...res,
    }),
    { status: res.status }
  );
}
