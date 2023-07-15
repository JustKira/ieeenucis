"use client";

import React from "react";
import usePermission from "@/lib/hooks/usePermission";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import QuickNav from "@/components/ui/QuickNav";
import { QuickLoader } from "@/components/ui/loaders";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { checkPermission, isLoading } = usePermission();

  const navlinks = [
    { path: "/view", name: "view" },
    { path: "/create", name: "create" },
    { path: "/update", name: "update" },
    { path: "/delete", name: "delete" },
    { path: "/approve", name: "approve" },
  ];

  if (isLoading) {
    return (
      <>
        <QuickLoader loading />
      </>
    );
  }
  return (
    <>
      {checkPermission(
        ["admin_task"],
        <Card className="mt-4 border-none drop-shadow-none dark:drop-shadow-none">
          <CardHeader>
            <QuickNav parentPath="/tasks" navlinks={navlinks} />
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>,
        <></>,
        true
      )}
    </>
  );
}
