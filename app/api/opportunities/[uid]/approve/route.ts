import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/Database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Task } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const { searchParams } = new URL(request.url);

  const orid = searchParams.get("orid");

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

  const opportunitytasksRes = await supabase
    .from("Opportunity")
    .select("OpportunityRequest(id),OpportunityTask(Task(*))")
    .eq("OpportunityTask.id", orid)
    .limit(1)
    .single();

  if (opportunitytasksRes.error) {
    return new NextResponse(
      JSON.stringify({
        ...opportunitytasksRes,
      }),
      { status: opportunitytasksRes.status }
    );
  }

  const tasksToCreate: any = opportunitytasksRes.data.OpportunityTask.map(
    (task) => {
      return { ...task.Task, dupped: true };
    }
  );

  const createTask = await supabase
    .from("Task")
    .insert(tasksToCreate)
    .select("id");

  if (createTask.error) {
    return new NextResponse(
      JSON.stringify({
        ...createTask,
      }),
      { status: createTask.status }
    );
  }

  const userTaskToCreate = createTask.data.map((task) => {
    return { taskId: task.id, userId: userRes.data.id };
  });
  const createUserTask = await supabase
    .from("UserTask")
    .insert(userTaskToCreate);

  return new NextResponse(
    JSON.stringify({
      ...createUserTask,
    }),
    { status: createUserTask.status }
  );
}
