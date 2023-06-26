"use client";

import React from "react";
import usePermission from "@/lib/hooks/usePermission";
import { Card } from "@/components/ui/card";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { checkPermission, isLoading } = usePermission();
  if (isLoading) {
    return (
      <>
        <main className="grid w-full grid-cols-5 grid-rows-6 gap-4">
          <Card className="col-span-1 row-span-1 bg-foreground/25 animate-pulse"></Card>
          <Card className="col-span-4 row-span-6 bg-foreground/25 animate-pulse"></Card>
          <Card className="w-full col-span-1 row-span-5 bg-foreground/25 animate-pulse"></Card>
        </main>
      </>
    );
  }
  return (
    <>
      {checkPermission(
        ["default_opportunity", "admin_opportunity"],
        <>{children}</>,
        <></>,
        true
      )}
    </>
  );
}
