import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/Database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Task } from "@/types";

export async function POST(
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
    .select("OpportunityRequest!inner(id),OpportunityTask!inner(Task(*))")
    .eq("OpportunityRequest.id", orid)
    .limit(1)
    .single();
  console.log(opportunitytasksRes);
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
      if (task.Task) {
        const { id, ...rest } = task.Task;
        return { ...rest, dupped: true };
      }
    }
  );
  console.log(tasksToCreate);
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
  console.log(userTaskToCreate);
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
