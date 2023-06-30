import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "./lib/Database";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const { data: sessionData } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith("/auth/signout")) {
    if (!sessionData.session?.user)
      return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/auth/signin")) {
    if (sessionData.session?.user)
      return NextResponse.redirect(new URL("/auth/signout", req.url));
  }
  if (
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/auth/new")
  ) {
    const { data: reSessionData } = await supabase.auth.getSession();
    if (!reSessionData.session?.user) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    const { data: user } = await supabase
      .from("User")
      .select()
      .eq("uid", reSessionData.session?.user.id)
      .single();
    if (!user?.id && !req.nextUrl.pathname.startsWith("/auth/new")) {
      return NextResponse.redirect(new URL("/auth/new", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
