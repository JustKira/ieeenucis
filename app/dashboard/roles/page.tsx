import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import CreateRole from "./CreateRole";
import UpdateRole from "./UpdateRole";

function page() {
  return (
    <main className="flex p-4 space-x-4">
      <Tabs defaultValue="create" className="w-full">
        <TabsList>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreateRole />
        </TabsContent>
        <TabsContent value="update">
          <UpdateRole />
        </TabsContent>
        <TabsContent value="delete">Under Work</TabsContent>
      </Tabs>
    </main>
  );
}

export default page;
