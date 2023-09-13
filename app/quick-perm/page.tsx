"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import usePermission from "@/lib/hooks/usePermission";
import { useQuickPermsMutation } from "@/lib/redux/api/opportunitiesApi";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

function page() {
  const { checkPermission, isLoading } = usePermission();
  const nav = useRouter();
  const [quickPerms, quickPermsRes] = useQuickPermsMutation();

  if (isLoading && quickPermsRes.isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      {checkPermission(
        ["default_task", "default_opportunity"],
        <Card className="mt-4 border-none drop-shadow-none dark:drop-shadow-none">
          <CardHeader></CardHeader>
          <CardContent>All Set</CardContent>
        </Card>,

        <Button
          disabled={quickPermsRes.isLoading}
          onClick={async () => {
            quickPerms().then(() => {
              nav.refresh();
            });
          }}
        >
          Click Me
        </Button>,
        false
      )}
    </div>
  );
}

export default page;
