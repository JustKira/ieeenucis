import { Database } from "@/lib/database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const collectionsRes = await supabase
    .schema("quizzy")
    .from("QuestionsCollection")
    .select();

  return new NextResponse(
    JSON.stringify({
      ...collectionsRes,
    }),
    { status: collectionsRes.status }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const res = await supabase
    .schema("quizzy")
    .from("QuestionsCollection")
    .insert(body);

  return new NextResponse(
    JSON.stringify(
      res.error
        ? {
            ...res,
          }
        : null
    ),
    { status: res.status }
  );
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cid = searchParams.get("cid");
  const supabase = createRouteHandlerClient<Database>({ cookies });
  if (!cid) {
    return new NextResponse(
      JSON.stringify({
        error: "not QuestionId was provided in search params add cid={id}",
      }),
      { status: 404 }
    );
  }
  const res = await supabase
    .schema("quizzy")
    .from("QuestionsCollection")
    .delete()
    .eq("id", Number(cid));

  return new NextResponse(
    res.error
      ? JSON.stringify({
          ...res,
        })
      : null,
    { status: res.status }
  );
}
