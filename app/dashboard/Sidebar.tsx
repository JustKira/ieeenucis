"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import SidebarNavLinks from "@/app/dashboard/SidebarNavLinks";
import { Check, ListChecks, Home, Shield, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import useBoolDelay from "@/lib/hooks/useBoolDelay";

function Sidebar() {
  const [extend, setExtend] = useState<boolean>(true);
  const delayedExtend = useBoolDelay(extend, 50, false);
  const navlinks: {
    href: string;
    icon: JSX.Element;
    text: string;
    exact?: boolean;
  }[] = [
    { href: "/dashboard", icon: <Home />, text: "Board", exact: true },
    { href: "/dashboard/roles", icon: <ShieldAlert />, text: "Roles" },
    { href: "/dashboard/tasks", icon: <ListChecks />, text: "Tasks" },
  ];
  return (
    <div
      className={`${
        extend ? "w-12" : "w-12"
      } mr-12 transition-all duration-300`}
    >
      <Card
        onClick={() => setExtend(!extend)}
        className="fixed h-[92vh] border-0 border-r rounded-none"
      >
        <nav
          className={`flex flex-col flex-grow h-full items-start m-4 space-y-4 transition-all duration-300 ${
            extend ? "w-12" : "w-48"
          }`}
        >
          <div className="flex flex-col w-full space-y-4">
            {navlinks.map((navlink, id) => {
              return (
                <SidebarNavLinks
                  exact={navlink.exact}
                  key={id}
                  href={navlink.href}
                >
                  <div className="flex items-center justify-center">
                    {navlink.icon}
                  </div>
                  <h1 className={delayedExtend ? "hidden" : "block"}>
                    {navlink.text}
                  </h1>
                </SidebarNavLinks>
              );
            })}
          </div>
        </nav>
      </Card>
    </div>
  );
}

export default Sidebar;
