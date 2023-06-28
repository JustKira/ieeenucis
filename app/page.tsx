"use client";
import Image from "next/image";
import Link from "next/link";
import { ClubActivites, ClubCommittess, Main } from "./HomePages";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Arrow, Separator } from "@radix-ui/react-dropdown-menu";
import { Activity, Users2, Home, ArrowBigDown } from "lucide-react";

export default function HomePage() {
  const SideHomeBar = () => {
    return (
      <div className="fixed -translate-y-1/2 top-1/2 left-4">
        <Card className="px-1 py-4 text-xs rounded-full">
          <ul className="flex flex-col gap-6 px-1">
            <Home /> <Activity /> <Users2 />
          </ul>
        </Card>
      </div>
    );
  };
  return (
    <main className="flex flex-col">
      <div className="fixed top-0 h-screen w-full bg-[url(/kl0.png)] dark:bg-[url(/kl0_dark.png)] bg-center bg-cover bg-no-repeat" />
      <div className="relative z-30 flex items-center justify-center h-screen px-12 bg-fixed">
        <SideHomeBar />
        <div className="px-12 mt-32">
          <h1 className="font-black text-8xl">IEEE NU CIS</h1>
          <h2 className="text-4xl font-medium">BETA</h2>
        </div>
        <div className="absolute -translate-x-1/2 bottom-12 left-1/2">
          <ArrowBigDown
            size={50}
            className="animate-bounce fill-primary stroke-primary"
          />
        </div>
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center w-full">
        <Card className="w-[90%] px-12 py-1">
          <Main />
          <Separator />
          <div className="w-full h-32 bg-[url(/kl0.png)] dark:bg-[url(/kl0_dark.png)] bg-center bg-cover bg-no-repeat rounded-2xl" />
          <ClubActivites />
          <Separator />
          <div className="w-full h-32 bg-[url(/kl0.png)] dark:bg-[url(/kl0_dark.png)] bg-center bg-cover bg-no-repeat rounded-2xl" />
          <ClubCommittess />
        </Card>
      </div>
    </main>
  );
}
