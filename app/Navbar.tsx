import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React from "react";

function Navbar() {
  return (
    <nav className=" h-[8vh]">
      <Card className="border-x-0 border-t-0 rounded-none fixed w-full h-[8vh] z-50 flex items-center px-2  border-border">
        <div className="flex items-center gap-2">
          <Avatar className="rounded-lg">
            <AvatarImage />
            <AvatarFallback />
          </Avatar>
          <h1>Avatar</h1>
        </div>
      </Card>
    </nav>
  );
}

export default Navbar;
