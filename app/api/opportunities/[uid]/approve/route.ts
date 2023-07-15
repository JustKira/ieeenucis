import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/Database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const { searchParams } = new URL(request.url);

  const orid = searchParams.get("orid");
  const tid = searchParams.get("tid");

  if (!tid) {
    return new NextResponse(
      JSON.stringify({
        error: {
          message: "no tid was in query",
          hint: "Please include the 'tid' parameter in the query.",
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

  if (!orid) {
    return new NextResponse(
      JSON.stringify({
        error: {
          message: "no orid was in query",
          hint: "Please include the 'orid' parameter in the query.",
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
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const userRes = await supabase
    .from("User")
    .select("*")
    .eq("uid", params.uid)
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

  const opportunityRequestRes = await supabase
    .from("OpportunityRequest")
    .update({ approved: true })
    .eq("id", orid);

  if (opportunityRequestRes.error) {
    return new NextResponse(
      JSON.stringify({
        ...opportunityRequestRes,
      }),
      { status: opportunityRequestRes.status }
    );
  }

  const taskRes = await supabase
    .from("Task")
    .select("createdAt,dueDate,description,title,issuerId,points")
    .eq("id", tid)
    .limit(1)
    .single();

  if (taskRes.error) {
    return new NextResponse(
      JSON.stringify({
        ...taskRes,
      }),
      { status: taskRes.status }
    );
  }

  const createTask = await supabase
    .from("Task")
    .insert({ ...taskRes.data, dupped: true })
    .select("id")
    .single();

  if (createTask.error) {
    return new NextResponse(
      JSON.stringify({
        ...createTask,
      }),
      { status: createTask.status }
    );
  }

  const createUserTask = await supabase
    .from("UserTask")
    .insert({ taskId: createTask.data.id, userId: userRes.data.id });

  return new NextResponse(
    JSON.stringify({
      ...createUserTask,
    }),
    { status: createUserTask.status }
  );
}
