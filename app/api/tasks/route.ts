import { Task } from "@/types";

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
  const query = supabase.from("Task").select();

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

export async function POST(request: Request) {
  const body = (await request.json()) as {
    task: Task;
    rolesId: number[];
    usersId: number[];
  };

  return new NextResponse(
    JSON.stringify({
      error: {
        message: "no id was provided in query",
        hint: "Please include the 'id' parameter in the query.",
        details: null,
        code: 400,
      },
      data: body,
      status: 400,
      statusText: "Bad Request",
    }),
    { status: 400 }
  );
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const body = (await request.json()) as Partial<Omit<Task, "User">>;

  if (!id) {
    return new NextResponse(
      JSON.stringify({
        error: {
          message: "no id was provided in query",
          hint: "Please include the 'id' parameter in the query.",
          details: null,
          code: 400,
        },
        status: 400,
        statusText: "Bad Request",
      }),
      { status: 400 }
    );
  }

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const query = supabase
    .from("Task")
    .update({ ...body })
    .eq("id", id);

  const res = await query;

  return new NextResponse(
    res.error || res.data ? JSON.stringify({ ...res }) : null,
    {
      status: res.status,
    }
  );
}
