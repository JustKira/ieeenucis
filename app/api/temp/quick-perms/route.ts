import { Database } from "@/lib/Database";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return new NextResponse(
      JSON.stringify({
        error: error.message,
        status: error.status,
      }),
      { status: error.status }
    );
  }

  if (!user) {
    return new NextResponse(
      JSON.stringify({
        error: "no User was found",
        status: 404,
      }),
      { status: 404 }
    );
  }

  const userRes = await supabase
    .from("User")
    .select()
    .eq("uid", user.id)
    .limit(1)
    .single();
  if (userRes.error) {
    return new NextResponse(
      JSON.stringify({
        ...userRes,
      }),
      { status: userRes.status }
    );
  }

  const res = await supabase
    .from("UserRole")
    .insert({ userId: userRes.data.id, roleId: 2 });

  if (res.error) {
    return new NextResponse(null, { status: res.status });
  }
}
