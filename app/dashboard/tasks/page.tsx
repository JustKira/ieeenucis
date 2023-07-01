"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePermission from "@/lib/hooks/usePermission";
import GenericUserList from "@/components/generics/GenericUserList";
import { User } from "@/types";
import CreateTask from "./CreateTask";
import ViewTask from "./ViewTask";
import ApproveTask from "./ApproveTask";
function TasksPage() {
  const { checkPermission } = usePermission();

  return (
    <main className="flex p-4 space-x-4">
      <Tabs defaultValue="view" className="w-full">
        <TabsList>
          <TabsTrigger value="view">View</TabsTrigger>
          {checkPermission(
            ["admin_task"],
            <>
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="update">Update</TabsTrigger>
              <TabsTrigger value="delete">Delete</TabsTrigger>
              <TabsTrigger value="approve">Approve</TabsTrigger>
            </>,
            <></>
          )}
        </TabsList>
        <TabsContent className="w-full" value="view">
          <ViewTask />
        </TabsContent>
        <TabsContent className="w-full" value="create">
          <CreateTask />
        </TabsContent>
        <TabsContent className="w-full" value="update"></TabsContent>
        <TabsContent className="w-full" value="approve">
          <ApproveTask />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default TasksPage;
