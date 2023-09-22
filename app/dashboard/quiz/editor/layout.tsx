"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import usePermission from "@/lib/hooks/usePermission";

import Link from "next/link";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
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
        ["admin_quiz"],
        <>
          <>
            <CardHeader>
              <CardTitle>EditorPage</CardTitle>
              <CardDescription className="flex gap-8 border border-border rounded-full w-fit px-8">
                <Link href={"/dashboard/quiz/editor/collection"}>
                  <Button className="p-0 w-fit" variant={"link"}>
                    Collection
                  </Button>
                </Link>
                <Link href={"/dashboard/quiz/editor/questions"}>
                  <Button className="p-0 w-fit" variant={"link"}>
                    Questions
                  </Button>
                </Link>
                <Link href={"/dashboard/quiz/editor"}>
                  <Button className="p-0 w-fit" variant={"link"}>
                    Quiz
                  </Button>
                </Link>
                <Link href={"/dashboard/quiz/editor/schedule"}>
                  <Button className="p-0 w-fit" variant={"link"}>
                    Schedule
                  </Button>
                </Link>
              </CardDescription>
            </CardHeader>
            {children}
          </>
        </>,
        <></>,
        true
      )}
    </>
  );
}

export default layout;
