"use client";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetSingleUserQuery } from "@/lib/redux/api/usersSupaApi";
import { Lock } from "lucide-react";
import Link from "next/link";
import React from "react";

function Navbar() {
  const { data } = useGetSingleUserQuery(-1);

  return (
    <nav className="">
      <Card className="justify-between border-x-0 border-t-0 rounded-none fixed w-full h-[8vh] z-50 flex items-center px-2 border-border bg-background">
        <div className="flex items-center gap-2">
          {data?.id ? (
            <>
              <Avatar className="rounded-lg">
                <AvatarImage
                  className="rounded-full"
                  src={`https://ui-avatars.com/api/?name=${data.firstname}+${data.lastname}`}
                />
                <AvatarFallback />
              </Avatar>
              <div className="flex flex-col">
                <h1 className="font-medium capitalize text-primary/75">
                  {data.firstname} {data.lastname}
                </h1>
                <h2 className="text-xs font-light text-primary/50">
                  {data.email}
                </h2>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <nav className="flex items-center gap-2 text-sm font-light">
          <Link href={"/"}>
            <Button variant={"link"}>Home </Button>
          </Link>
          <Link href={"/kaggle"}>
            <Button variant={"link"}>Kaggle</Button>
          </Link>
          <Link href={"/leaderboard"}>
            <Button variant={"link"}>Leaderboard</Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button variant={"link"}>Dashboard</Button>
          </Link>

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
