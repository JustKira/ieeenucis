"use client";

import React from "react";
import usePermission from "@/lib/hooks/usePermission";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import QuickNav from "@/components/ui/QuickNav";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        ["default_quiz", "admin_quiz"],
        <Card className="mt-4 border-none drop-shadow-none dark:drop-shadow-none">
          <CardHeader>
            <nav className="flex gap-2">
              {checkPermission(
                ["admin_quiz"],
                <>
                  <Link href={"/dashboard/quiz/editor/collection"}>
                    <Button
                      variant={"outline"}
                      className="capitalize rounded-full"
                    >
                      Editor
                    </Button>
                  </Link>
                  <Link href={"/dashboard/quiz/history"}>
                    <Button
                      variant={"outline"}
                      className="capitalize rounded-full"
                    >
                      History
                    </Button>
                  </Link>
                  <Link href={"/dashboard/quiz/analytic"}>
                    <Button
                      variant={"outline"}
                      className="capitalize rounded-full"
                    >
                      {"Sokar Analytics <3"}
                    </Button>
                  </Link>
                </>,
                <Link href={"/dashboard/quiz"}>
                  <Button
                    variant={"outline"}
                    className="capitalize rounded-full"
                  >
                    View
                  </Button>
                </Link>,

                false
              )}
            </nav>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>,
        <></>,
        true
      )}
    </>
  );
}
