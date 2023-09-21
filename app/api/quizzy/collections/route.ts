import { Database } from "@/lib/Database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
