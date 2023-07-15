import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/Database";
import { cookies } from "next/headers";
import { Tag } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const limit = searchParams.get("limit");
  const skip = searchParams.get("skip");
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const query = supabase.from("Tag").select("*", { count: "exact" });
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
  const body = (await request.json()) as Tag;

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const res = await supabase.from("Tag").insert({ ...body });

  return new NextResponse(
    res.error || res.data ? JSON.stringify({ ...res }) : null,
    {
      status: res.status,
    }
  );
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const body = (await request.json()) as Partial<Tag>;

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
  const res = await supabase
    .from("Tag")
    .update({ ...body })
    .eq("id", id);

  return new NextResponse(
    res.error || res.data ? JSON.stringify({ ...res }) : null,
    {
      status: res.status,
    }
  );
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

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
  const res = await supabase.from("Tag").delete().eq("id", id);

  return new NextResponse(
    res.error || res.data ? JSON.stringify({ ...res }) : null,
    {
      status: res.status,
    }
  );
}
