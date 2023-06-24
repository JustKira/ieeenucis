import React from "react";
import Sidebar from "@/app/dashboard/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function layout(props: DashboardLayoutProps) {
  const { children } = props;
  return (
    <div className="flex flex-grow">
      <Sidebar />
      <div className="flex-grow h-full">{children}</div>
    </div>
  );
}

export default layout;
