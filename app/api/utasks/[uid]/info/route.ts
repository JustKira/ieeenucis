import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/Database";
import { cookies } from "next/headers";
export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const { searchParams } = new URL(request.url);

  const limit = searchParams.get("limit");
  const skip = searchParams.get("skip");
  const search = searchParams.get("search");
  const approved = searchParams.get("approved");
  const finished = searchParams.get("finished");

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const query = supabase
    .from("UserTask")
    .select(
      "id,approved,finished,User!inner(id,uid),Task!inner(id,title,dueDate,points)",
      {
        count: "exact",
      }
    );
  if (params.uid) {
    query.eq("User.uid", params.uid);
  }
  if (search) {
    query.textSearch("Task.title", search, { type: "plain" });
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
