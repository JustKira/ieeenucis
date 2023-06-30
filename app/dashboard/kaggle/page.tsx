"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateKaggle from "./CreateKaggle";

function KagglePage() {
  return (
    <main className="flex p-4 space-x-4">
      <Tabs defaultValue="create" className="w-full">
        <TabsList>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreateKaggle />
        </TabsContent>
        <TabsContent value="update"></TabsContent>
        <TabsContent value="delete"></TabsContent>
      </Tabs>
    </main>
  );
}

export default KagglePage;
