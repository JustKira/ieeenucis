import { NextResponse } from "next/server";
import supaRouterHandler from "@/lib/Supa/SupaRoute";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/Database";
import { cookies } from "next/headers";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const uid = searchParams.get("uid");
  const limit = searchParams.get("limit");
  const skip = searchParams.get("skip");
  const approved = searchParams.get("approved");
  const finished = searchParams.get("finished");

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const query = supabase
    .from("UserTask")
    .select("*,User!inner(id,uid,firstname,lastname),Task(id,title)", {
      count: "exact",
    });
  if (uid) {
    query.eq("User.uid", uid);
  }

  if (finished === "true") {
    query.eq("finished", true);
  } else {
    query.eq("finished", false);
  }

  if (approved === "true") {
    query.eq("approved", true);
  } else {
    query.eq("approved", false);
  }

  if (limit) {
    query
      .range(parseInt(skip || "0"), parseInt(skip || "0") + parseInt(limit))
      .limit(parseInt(limit));
  } else {
    return new NextResponse(
      JSON.stringify({
        error: {
          message: "no limit was in query",
          hint: "Please include the 'limit' parameter in the query.",
          details: null,
          code: 400,
        },
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
