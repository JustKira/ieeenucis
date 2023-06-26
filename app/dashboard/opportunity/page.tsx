import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import CreateOpportunity from "./CreateOpportunity";
import ViewOpportunity from "./ViewOpportunity";
import CreateOpportunityTask from "./CreateOpportunityTask";

function page() {
  return (
    <main className="flex p-4 space-x-4">
      <Tabs defaultValue="view" className="w-full">
        <TabsList>
          <TabsTrigger value="view">View</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          <ViewOpportunity />
        </TabsContent>
        <TabsContent value="create">
          <main className="flex p-4 space-x-4">
            <Tabs defaultValue="opportunity" className="w-full">
              <TabsList>
                <TabsTrigger value="opportunity">Opportunity</TabsTrigger>
                <TabsTrigger value="task">Task</TabsTrigger>
              </TabsList>
              <TabsContent value="opportunity">
                <CreateOpportunity />
              </TabsContent>
              <TabsContent value="task">
                <CreateOpportunityTask />
              </TabsContent>
            </Tabs>
          </main>
        </TabsContent>
        <TabsContent value="update"></TabsContent>
        <TabsContent value="delete">Under Work</TabsContent>
      </Tabs>
    </main>
  );
}

export default page;
