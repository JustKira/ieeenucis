"use client";
import { User } from "@/types";
import { Award, Crown, Hexagon, Trophy } from "lucide-react";
import React from "react";
import { GiLibertyWing } from "react-icons/gi";
import { GrTrophy } from "react-icons/gr";
import T1Svg from "./T1Svg";
import T3Svg from "./T3Svg";
import T2Svg from "./T2Svg";
interface TopProps {
  user: Partial<User>;
}

const Top1: React.FC<TopProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-56 bg-white h-80 opacity-20 blur-3xl animate-pulse" />
      <div className="relative z-20 flex flex-col items-center justify-center w-56 p-4 rounded-lg h-80 bg-foreground text-primary-foreground overflow-clip">
        <h1 className="text-3xl font-bold text-center uppercase">
          {user.firstname} {user.lastname}
        </h1>

        <div />
        <T1Svg />
      </div>
      <h1 className="absolute bottom-0 z-30 flex items-center justify-center p-2 text-3xl font-black -translate-x-1/2 translate-y-1/2 border-2 rounded-full w-14 h-14 border-background bg-foreground left-1/2 text-primary-foreground ">
        {user.score}
      </h1>
      {/* <div className="absolute top-0 left-0 w-48 h-56 scale-75 translate-y-2 bg-white rounded-sm opacity-75 translate-x-1/3" />
      <div className="absolute top-0 right-0 w-48 h-56 scale-75 translate-y-2 bg-white rounded-sm opacity-75 -translate-x-1/3" /> */}
    </div>
  );
};
const Top2: React.FC<TopProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-56 bg-white h-80 opacity-20 blur-3xl animate-pulse" />
      <div className="relative z-20 flex flex-col items-center justify-center w-56 p-4 rounded-lg h-80 bg-foreground text-primary-foreground overflow-clip">
        <h1 className="text-3xl font-bold text-center uppercase">
          {user.firstname} {user.lastname}
        </h1>

        <div />
        <T2Svg />
      </div>
      <h1 className="absolute bottom-0 z-30 flex items-center justify-center p-2 text-3xl font-black -translate-x-1/2 translate-y-1/2 border-2 rounded-full w-14 h-14 border-background bg-foreground left-1/2 text-primary-foreground ">
        {user.score}
      </h1>
      {/* <div className="absolute top-0 left-0 w-48 h-56 scale-75 translate-y-2 bg-white rounded-sm opacity-75 translate-x-1/3" />
    <div className="absolute top-0 right-0 w-48 h-56 scale-75 translate-y-2 bg-white rounded-sm opacity-75 -translate-x-1/3" /> */}
    </div>
  );
};
const Top3: React.FC<TopProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-56 bg-white h-80 opacity-20 blur-3xl animate-pulse" />
      <div className="relative z-20 flex flex-col items-center justify-center w-56 p-4 rounded-lg h-80 bg-foreground text-primary-foreground overflow-clip">
        <h1 className="text-3xl font-bold text-center uppercase">
          {user.firstname} {user.lastname}
        </h1>

        <div />
        <T3Svg />
      </div>
      <h1 className="absolute bottom-0 z-30 flex items-center justify-center p-2 text-3xl font-black -translate-x-1/2 translate-y-1/2 border-2 rounded-full w-14 h-14 border-background bg-foreground left-1/2 text-primary-foreground ">
        {user.score}
      </h1>
      {/* <div className="absolute top-0 left-0 w-48 h-56 scale-75 translate-y-2 bg-white rounded-sm opacity-75 translate-x-1/3" />
    <div className="absolute top-0 right-0 w-48 h-56 scale-75 translate-y-2 bg-white rounded-sm opacity-75 -translate-x-1/3" /> */}
    </div>
  );
};

export { Top1, Top2, Top3 };
