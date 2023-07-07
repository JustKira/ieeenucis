import { Task } from "@/types";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/Database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
