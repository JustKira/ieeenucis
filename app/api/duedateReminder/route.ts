import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DateTime } from "luxon";

export async function GET() {
  const today = DateTime.local();
  const supabase = createRouteHandlerClient<Database>({ cookies });
  // Set the time to midnight to compare the date only
  const res = await supabase
    .from("UserTask")
    .select(
      "finished,User(email,firstname,lastname),Task!inner(title,dueDate,id)",
      {
        count: "exact",
      }
    )
    .eq("finished", false)
    .lte("Task.dueDate", today.plus({ days: 1 }).toISO()) // Filter tasks with Task.dueDate less than (or equal to) 1 day from now
    .gte("Task.dueDate", today.toISO());

  res.data?.map((data) => {
    if (data.User?.email && data.Task?.title)
      fetch(`${process.env.NEXT_PUBLIC_ROOT_PATH}/api/email`, {
        method: "POST",
        body: JSON.stringify({
          email: data.User.email,
          text: `This is a friendly reminder about the upcoming due dates for tasks assigned to you. Please ensure timely completion https://www.ieeenucis.club/dashboard/tasks/${data.Task.id}`,
          title: `Urgent Reminder: ${data.Task.title} Due Dates Approaching`,
        }),
      });
  });
  try {
    return new NextResponse(JSON.stringify({ ...res }), { status: res.status });
  } catch (error) {
    return new NextResponse(null, { status: 400 });
  }
}
