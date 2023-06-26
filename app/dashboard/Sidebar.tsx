"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import SidebarNavLinks from "@/app/dashboard/SidebarNavLinks";
import {
  Check,
  ListChecks,
  Home,
  Shield,
  ShieldAlert,
  Users2,
  Lock,
  Clover,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useBoolDelay from "@/lib/hooks/useBoolDelay";
import Link from "next/link";

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
    { href: "/dashboard/users", icon: <Users2 />, text: "Users" },
    { href: "/dashboard/tasks", icon: <ListChecks />, text: "Tasks" },
    { href: "/dashboard/opportunity", icon: <Clover />, text: "Opportunity" },
  ];
  return (
    <div
      className={`${
        extend ? "w-12" : "w-12"
      } mr-12 transition-all duration-300`}
    >
      <Card
        onClick={() => setExtend(!extend)}
        className="fixed h-[92vh] border-0 border-r rounded-none z-50"
      >
        <nav
          className={`flex flex-col flex-grow justify-between h-full items-start m-4 space-y-4 transition-all duration-300 pb-8 ${
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
          <div className="flex items-center justify-center w-12 h-12">
            <Button variant={"outline"} className="w-12 h-12">
              <Link
                href={"/auth/signout"}
                className="flex items-center justify-center"
              >
                <Lock />
              </Link>
            </Button>
          </div>
        </nav>
      </Card>
    </div>
  );
}

export default Sidebar;
