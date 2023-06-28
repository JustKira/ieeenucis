"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import SidebarNavLinks from "@/app/dashboard/SidebarNavLinks";
import {
  ListChecks,
  Home,
  ShieldAlert,
  Users2,
  Lock,
  Clover,
  Loader2,
  BarChart3,
  BrainCircuit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useBoolDelay from "@/lib/hooks/useBoolDelay";
import Link from "next/link";
import usePermission from "@/lib/hooks/usePermission";

function Sidebar() {
  const [extend, setExtend] = useState<boolean>(true);
  const { checkPermission } = usePermission();
  const delayedExtend = useBoolDelay(extend, 50, false);
  const navlinks: {
    href: string;
    icon: JSX.Element;
    text: string;
    exact?: boolean;
    permissions: string[];
  }[] = [
    {
      href: "/dashboard",
      permissions: [""],
      icon: <Home size={18} />,
      text: "Board",
      exact: true,
    },
    {
      href: "/dashboard/roles",
      permissions: [],
      icon: <ShieldAlert size={18} />,
      text: "Roles",
    },
    {
      href: "/dashboard/users",
      permissions: [],
      icon: <Users2 size={18} />,
      text: "Users",
    },
    {
      href: "/dashboard/tasks",
      permissions: ["default_task", "admin_task"],
      icon: <ListChecks size={18} />,
      text: "Tasks",
    },
    {
      href: "/dashboard/opportunity",
      permissions: ["default_opportunity", "admin_opportunity"],
      icon: <Clover size={18} />,
      text: "Opportunity",
    },
    {
      href: "/dashboard/score",
      permissions: ["admin_scoring"],
      icon: <BarChart3 size={18} />,
      text: "Scoring",
    },
    {
      href: "/dashboard/kaggle",
      permissions: ["admin_kaggle"],
      icon: <BrainCircuit size={18} />,
      text: "Kaggle",
    },
  ];
  return (
    <div
      className={`${
        extend ? "w-10" : "w-10"
      } mr-12 transition-all duration-300`}
    >
      <Card
        onClick={() => setExtend(!extend)}
        className="fixed h-[92vh] border-0 border-r rounded-none z-50"
      >
        <nav
          className={`flex flex-col flex-grow justify-between h-full items-start m-4 space-y-4 transition-all duration-300 pb-8 ${
            extend ? "w-10" : "w-48"
          }`}
        >
          <div className="flex flex-col w-full space-y-4">
            {navlinks.map((navlink, id) => {
              if (navlink.href === "/dashboard") {
                return (
                  <SidebarNavLinks
                    exact={navlink.exact}
                    key={id}
                    href={navlink.href}
                  >
                    <div className="flex items-center justify-center">
                      {navlink.icon}
                    </div>
                    <h1
                      className={
                        delayedExtend ? "hidden text-xs" : "block text-xs"
                      }
                    >
                      {navlink.text}
                    </h1>
                  </SidebarNavLinks>
                );
              }
              return (
                <>
                  {checkPermission(
                    navlink.permissions,
                    <SidebarNavLinks
                      exact={navlink.exact}
                      key={id}
                      href={navlink.href}
                    >
                      <div className="flex items-center justify-center">
                        {navlink.icon}
                      </div>
                      <h1
                        className={
                          delayedExtend ? "hidden text-xs" : "block text-xs"
                        }
                      >
                        {navlink.text}
                      </h1>
                    </SidebarNavLinks>,
                    <></>
                  )}
                </>
              );
            })}
          </div>
        </nav>
      </Card>
    </div>
  );
}

export default Sidebar;
