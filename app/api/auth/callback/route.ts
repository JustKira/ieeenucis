import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);

    const { data, error } = await supabase.auth.getUser();

    if (data.user?.id && !error) {
      const { data: user } = await supabase
        .from("User")
        .select()
        .eq("uid", data.user.id);
      if (!user) {
        return NextResponse.redirect(new URL("/auth/new", request.url));
      }
    }
  }
  return NextResponse.redirect(new URL("/dashboard", request.url));
}
