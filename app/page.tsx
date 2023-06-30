"use client";
import Image from "next/image";
import Link from "next/link";
import { ClubActivites, ClubCommittess, Main } from "./HomePages";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Arrow, Separator } from "@radix-ui/react-dropdown-menu";
import { Activity, Users2, Home, ArrowBigDown } from "lucide-react";
import { useRef } from "react";

export default function HomePage() {
  const section1 = useRef<HTMLDivElement>(null);
  const section2 = useRef<HTMLDivElement>(null);
  const section3 = useRef<HTMLDivElement>(null);

  const scrollToDiv = (section: React.RefObject<HTMLDivElement>) => {
    if (section.current) {
      const { top } = section.current.getBoundingClientRect();
      window.scrollTo({
        top: top - 50 + window.scrollY,
        behavior: "smooth",
      });
    }
  };

  const SideHomeBar = () => {
    return (
      <div className="fixed z-40 -translate-y-1/2 top-1/2 left-4">
        <Card className="px-1 py-4 text-xs rounded-full">
          <ul className="flex flex-col gap-6 px-1">
            <button onClick={() => scrollToDiv(section1)}>
              <Home />
            </button>
            <button onClick={() => scrollToDiv(section2)}>
              <Activity />
            </button>
            <button onClick={() => scrollToDiv(section3)}>
              <Users2 />
            </button>
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
        <div className="items-center justify-center flex w-full bg-gradient-to-l from-transparent via-background/50 to-transparent backdrop-blur-md py-8">
          <div className="relative px-12 ">
            <h1 className="font-black text-8xl">IEEE NU CIS</h1>
            <h2 className="absolute top-0 right-0 translate-x-14 text-4xl font-medium">
              BETA
            </h2>
          </div>
        </div>

        <div className="absolute -translate-x-1/2 bottom-12 left-1/2">
          <ArrowBigDown
            size={50}
            className="animate-bounce fill-primary stroke-primary"
          />
        </div>
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center w-full mb-32">
        <div className="w-[90%] flex flex-col gap-12">
          <Card className="px-12 py-4" ref={section1}>
            <Main />
            <Separator />
          </Card>
          <Card className="px-12 py-4" ref={section2}>
            <div className="w-full h-32 bg-[url(/kl0.png)] dark:bg-[url(/kl0_dark.png)] bg-center bg-cover bg-no-repeat rounded-2xl" />
            <ClubActivites />
            <Separator />
          </Card>
          <Card className="px-12 py-4" ref={section3}>
            <div className="w-full h-32 bg-[url(/kl0.png)] dark:bg-[url(/kl0_dark.png)] bg-center bg-cover bg-no-repeat rounded-2xl" />
            <ClubCommittess />
          </Card>
        </div>
      </div>
    </main>
  );
}
