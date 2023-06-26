"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarNavLinks {
  href: string;
  children: React.ReactNode;
  exact?: Boolean;
}

function SidebarNavLinks(props: SidebarNavLinks) {
  const { href, exact, children } = props;
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      className={`${
        isActive ? "bg-accent" : ""
      } flex items-center w-full gap-2 p-3 text-sm rounded-md hover:bg-accent/50 transition-all duration-300`}
      href={href}
    >
      {children}
    </Link>
  );
}

export default SidebarNavLinks;
