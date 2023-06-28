import { ModeToggle } from "@/components/ui/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="">
      <Card className="justify-between border-x-0 border-t-0 rounded-none fixed w-full h-[8vh] z-50 flex items-center px-2 border-border bg-background">
        <div className="flex items-center gap-2">
          <Avatar className="rounded-lg">
            <AvatarImage />
            <AvatarFallback />
          </Avatar>
          <h1>Avatar</h1>
        </div>
        <nav className="flex items-center gap-2 text-sm font-light">
          <Link href={"/"}>Home</Link>
          <Link href={"/dashboard"}>Dashboard</Link>
          <ModeToggle />
          <div className="flex items-center justify-center w-10 h-10">
            <Button variant={"outline"} className="w-10 h-10">
              <Link
                href={"/auth/signout"}
                className="flex items-center justify-center"
              >
                <Lock size={20} />
              </Link>
            </Button>
          </div>
        </nav>
      </Card>
    </nav>
  );
}

export default Navbar;
