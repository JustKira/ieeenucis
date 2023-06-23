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
      {children}
    </div>
  );
}

export default layout;
