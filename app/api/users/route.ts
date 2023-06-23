import { NextResponse } from "next/server";
import supaRouterHandler from "@/lib/Supa/SupaRoute";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const many = searchParams.get("many");
  const uid = searchParams.get("uid");
  const supabase = supaRouterHandler;

  if (many === "true") {
    const { data: users, error } = await supabase.from("users").select("*");

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (users.length > 0) {
      return new NextResponse(JSON.stringify({ users }), { status: 200 });
    } else {
      return new NextResponse(
        JSON.stringify({ error: "No users were found" }),
        { status: 204 }
      );
    }
  }

  if (uid) {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("uid", uid)
      .single();

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (user) {
      return new NextResponse(JSON.stringify({ user }), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: "No user was found" }), {
        status: 500,
      });
    }
  }

  return new NextResponse(
    JSON.stringify({ error: "No Uid or Many parameters were provided" }),
    { status: 400 }
  );
}
