"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePermission from "@/lib/hooks/usePermission";
function TasksPage() {
  const { checkPermission } = usePermission();

  return (
    <main className="flex p-4 space-x-4">
      <Tabs defaultValue="view" className="w-full">
        <TabsList>
          <TabsTrigger value="view">View</TabsTrigger>
          {checkPermission(
            ["task_admin"],
            <>
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="update">Update</TabsTrigger>
              <TabsTrigger value="delete">Delete</TabsTrigger>
              <TabsTrigger value="approve">Approve</TabsTrigger>
            </>,
            <></>
          )}
        </TabsList>
        <TabsContent value="create"></TabsContent>
        <TabsContent value="update"></TabsContent>
        <TabsContent value="delete">Under Work</TabsContent>
      </Tabs>
    </main>
  );
}

export default TasksPage;
