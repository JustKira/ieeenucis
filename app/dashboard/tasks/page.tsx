"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePermission from "@/lib/hooks/usePermission";
import GenericUserList from "@/components/generics/GenericUserList";
import { User } from "@/types";
import CreateTask from "./CreateTask";
function TasksPage() {
  const { checkPermission } = usePermission();
  const [user, setUser] = useState<User | null>(null);

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
        <TabsContent value="create">
          <CreateTask />
        </TabsContent>
        <TabsContent value="update"></TabsContent>
        <TabsContent value="delete">Under Work</TabsContent>
      </Tabs>
    </main>
  );
}

export default TasksPage;
