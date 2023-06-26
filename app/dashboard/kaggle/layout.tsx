"use client";

import React from "react";
import usePermission from "@/lib/hooks/usePermission";
import { Card } from "@/components/ui/card";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { checkPermission, isLoading } = usePermission();
  if (isLoading) {
    return <></>;
  }
  return <>{checkPermission(["admin_kaggle"], <>{children}</>, <></>, true)}</>;
}
