import { UserTask } from "@/types";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const limit = searchParams.get("limit");
  const skip = searchParams.get("skip");

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const query = supabase
    .from("UserTask")
    .select("approved,finished,id,userId,Task(*)");

  if (id) {
    query.eq("id", id).limit(1).single();
  } else if (limit) {
    query
      .range(parseInt(skip || "0"), parseInt(skip || "0") + parseInt(limit))
      .limit(parseInt(limit));
  } else {
    return new NextResponse(
      JSON.stringify({
        error: "no limit,skip,id was in query",
        data: null,
        count: 0,
        status: 400,
        statusText: "bad request",
      }),
      { status: 400 }
    );
  }

  const res = await query;

  return new NextResponse(JSON.stringify({ ...res }), { status: res.status });
}
