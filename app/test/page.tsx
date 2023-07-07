"use client";
import { payments } from "@/components/tables/data-test";
import { TasksColums } from "@/components/tables/tasks/TasksColums";
import { TasksTable } from "@/components/tables/tasks/TasksTable";

import React from "react";

function page() {
  return (
    <div className="mt-32">
      <TasksTable data={payments} columns={TasksColums} />
    </div>
  );
}

export default page;
