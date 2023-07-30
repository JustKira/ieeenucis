import { Database } from "@/lib/Database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { kid: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const res = await supabase
    .from("KaggleCompetitionLeaderboard")
    .select()
    .eq("competitionId", params.kid)
    .limit(1)
    .single();
  console.log(res);
  if (res.data) {
    const data = res.data;
    const _res = await fetch(
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
      record = await _res.json();
      console.log(record);
    } catch (error) {}
    if (record) {
      const kcr = await supabase
        .from("KaggleCompetitionLeaderboard")
        .select("competitionId")
        .eq("competitionId", data.competitionId)
        .limit(1)
        .single();

      if (kcr.data) {
        await supabase
          .from("KaggleCompetitionRecord")
          .update({ record: record })
          .eq("competitionId", data.competitionId);
      } else {
        await supabase
          .from("KaggleCompetitionRecord")
          .insert({ record: record, competitionId: data.competitionId });
      }
    }
  }

  return new NextResponse(
    JSON.stringify({
      ...res,
    }),
    { status: res.status }
  );
}
