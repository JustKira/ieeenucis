import Link from "next/link";
import React from "react";
import { Button } from "./button";

interface QuickNavProps {
  parentPath: string;
  navlinks: { path: string; name: string }[];
}

const QuickNav: React.FC<QuickNavProps> = ({ navlinks, parentPath }) => {
  return (
    <nav className="flex gap-2">
      {navlinks.map((nl, id) => (
        <Link key={id} href={"/dashboard" + parentPath + nl.path}>
          <Button variant={"outline"} className="capitalize rounded-full">
            {nl.name}
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default QuickNav;
