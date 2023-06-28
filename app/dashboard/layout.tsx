import React from "react";
import Sidebar from "@/app/dashboard/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function layout(props: DashboardLayoutProps) {
  const { children } = props;
  return (
    <div className="flex h-full flex-grow mt-[8vh]">
      <Sidebar />
      <div className="flex-grow ">{children}</div>
    </div>
  );
}

export default layout;
