"use client";
import { User } from "@/types";
import { Award, Crown, Hexagon, Trophy } from "lucide-react";
import React from "react";

interface TopProps {
  user: Partial<User>;
}

const Top1: React.FC<TopProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-48 h-56 bg-white opacity-20 blur-3xl animate-pulse" />
      <div className="relative z-20 flex flex-col items-center justify-center w-48 h-56 p-4 rounded-lg bg-foreground text-primary-foreground overflow-clip">
        <Hexagon className="absolute bottom-0 translate-y-1/2" size={100} />
        <h1 className="text-3xl font-bold text-center uppercase">
          {user.firstname} {user.lastname}
        </h1>
        <h1 className="absolute bottom-0 text-5xl font-light translate-y-full">
          {user.score}
        </h1>
        <div />
        <Crown
          className="absolute top-0 z-50 -translate-x-1/2 -translate-y-1/2 left-1/2 text-primary-foreground"
          size={125}
        />
        <Hexagon
          className="absolute bottom-0 left-0 translate-y-1/2 text-primary-foreground drop-shadow-md"
          size={50}
        />{" "}
        <Hexagon
          className="absolute bottom-0 right-0 translate-y-1/2 text-primary-foreground drop-shadow-md"
          size={50}
        />
      </div>
      {/* <GiLibertyWing
        className="absolute top-0 right-0 translate-x-full -translate-y-1/2"
        size={250}
      />{" "}
      <GiLibertyWing
        className="absolute top-0 left-0 scale-y-100 -translate-x-full -translate-y-1/2 -scale-x-100"
        size={250}
      />
      <GiLibertyWing
        className="absolute top-0 right-0 translate-x-full -translate-y-1/2 opacity-75 blur-3xl"
        size={250}
      />{" "}
      <GiLibertyWing
        className="absolute top-0 left-0 scale-y-100 -translate-x-full -translate-y-1/2 opacity-75 blur-3xl -scale-x-100"
        size={250}
      /> */}
      <Crown
        className="absolute top-0 -translate-x-1/2 -translate-y-1/2 left-1/2 text-primary drop-shadow-md"
        size={125}
      />{" "}
      <Crown
        className="absolute top-0 -translate-x-1/2 -translate-y-1/2 left-1/2 text-primary drop-shadow-md blur-2xl animate-pulse"
        size={125}
      />
      <Hexagon
        fill="current"
        className="absolute bottom-0 -translate-x-1/2 translate-y-1/2 left-1/2 text-primary-foreground drop-shadow-md fill-foreground"
        size={100}
      />
      <Hexagon
        className="absolute bottom-0 translate-y-1/2 text-primary drop-shadow-md"
        size={50}
      />{" "}
      <Hexagon
        className="absolute bottom-0 right-0 translate-y-1/2 text-primary drop-shadow-md"
        size={50}
      />
      <h1 className="absolute bottom-0 z-30 text-3xl font-black -translate-x-1/2 translate-y-1/2 left-1/2 text-primary-foreground ">
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
      <div className="absolute top-0 left-0 w-48 h-56 bg-white opacity-20 blur-xl animate-pulse" />
      <div className="relative z-20 flex flex-col items-center justify-center w-48 h-56 p-4 rounded-lg bg-foreground text-primary-foreground overflow-clip">
        <Hexagon className="absolute bottom-0 translate-y-1/2" size={100} />
        <h1 className="text-xl font-bold text-center">
          {user.firstname} {user.lastname}
        </h1>
        <h1 className="absolute bottom-0 text-5xl font-light translate-y-full">
          {user.score}
        </h1>
        <div />
        <Award
          className="absolute top-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 text-primary-foreground border-primary-foreground"
          size={110}
        />
        <Award
          className="absolute top-0 z-50 rounded-full left-1/2 translate-x-1/3 -rotate-12 text-primary-foreground border-primary-foreground"
          size={50}
        />
        <Award
          className="absolute top-0 z-50 rounded-full right-1/2 -translate-x-1/3 rotate-12 text-primary-foreground border-primary-foreground"
          size={50}
        />
        <Hexagon
          className="absolute bottom-0 left-0 translate-y-1/2 text-primary-foreground drop-shadow-md"
          size={50}
        />{" "}
        <Hexagon
          className="absolute bottom-0 right-0 translate-y-1/2 text-primary-foreground drop-shadow-md"
          size={50}
        />
      </div>
      <Award
        className="absolute top-0 -translate-x-1/2 -translate-y-1/2 left-1/2 text-primary drop-shadow-md"
        size={110}
      />{" "}
      <Award
        className="absolute top-0 -translate-x-1/2 -translate-y-1/2 left-1/2 text-primary drop-shadow-md blur-2xl opacity-60 animate-pulse"
        size={110}
      />
      <Award
        className="absolute top-0 left-0 z-50 rotate-45 -translate-y-2 rounded-full text-primary-foreground border-primary-foreground"
        size={45}
      />{" "}
      <Award
        className="absolute top-0 right-0 z-50 -rotate-45 -translate-y-2 rounded-full text-primary-foreground border-primary-foreground"
        size={45}
      />
      <h1 className="absolute top-0 text-3xl -translate-x-1/2 -translate-y-full left-1/2 text-primary">
        2
      </h1>
      <Hexagon
        fill="current"
        className="absolute bottom-0 -translate-x-1/2 translate-y-1/2 left-1/2 text-primary-foreground drop-shadow-md fill-foreground"
        size={100}
      />
      <Hexagon
        className="absolute bottom-0 translate-y-1/2 text-primary drop-shadow-md"
        size={50}
      />{" "}
      <Hexagon
        className="absolute bottom-0 right-0 translate-y-1/2 text-primary drop-shadow-md"
        size={50}
      />
      <h1 className="absolute bottom-0 z-30 text-3xl font-black -translate-x-1/2 translate-y-1/2 left-1/2 text-primary-foreground ">
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
      <div className="absolute top-0 left-0 w-48 h-56 bg-white opacity-20 blur-xl animate-pulse" />
      <div className="relative z-20 flex flex-col items-center justify-center w-48 h-56 p-4 rounded-lg bg-foreground text-primary-foreground overflow-clip">
        <Hexagon className="absolute bottom-0 translate-y-1/2" size={100} />
        <h1 className="text-xl font-bold text-center">
          {user.firstname} {user.lastname}
        </h1>
        <h1 className="absolute bottom-0 text-5xl font-light translate-y-full">
          {user.score}
        </h1>
        <div />
        <Award
          className="absolute top-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 text-primary-foreground border-primary-foreground"
          size={110}
        />
        <Award
          className="absolute top-0 z-50 rounded-full left-1/2 translate-x-1/3 -rotate-12 text-primary-foreground border-primary-foreground"
          size={50}
        />
        <Award
          className="absolute top-0 z-50 rounded-full right-1/2 -translate-x-1/3 rotate-12 text-primary-foreground border-primary-foreground"
          size={50}
        />
        <Hexagon
          className="absolute bottom-0 left-0 translate-y-1/2 text-primary-foreground drop-shadow-md"
          size={50}
        />{" "}
        <Hexagon
          className="absolute bottom-0 right-0 translate-y-1/2 text-primary-foreground drop-shadow-md"
          size={50}
        />
      </div>
      <Award
        className="absolute top-0 -translate-x-1/2 -translate-y-1/2 left-1/2 text-primary drop-shadow-md"
        size={110}
      />{" "}
      <Award
        className="absolute top-0 -translate-x-1/2 -translate-y-1/2 left-1/2 text-primary drop-shadow-md blur-2xl opacity-60 animate-pulse"
        size={110}
      />
      <h1 className="absolute top-0 text-3xl -translate-x-1/2 -translate-y-full left-1/2 text-primary">
        3
      </h1>
      <Hexagon
        fill="current"
        className="absolute bottom-0 -translate-x-1/2 translate-y-1/2 left-1/2 text-primary-foreground drop-shadow-md fill-foreground"
        size={100}
      />
      <Hexagon
        className="absolute bottom-0 translate-y-1/2 text-primary drop-shadow-md"
        size={50}
      />{" "}
      <Hexagon
        className="absolute bottom-0 right-0 translate-y-1/2 text-primary drop-shadow-md"
        size={50}
      />
      <h1 className="absolute bottom-0 z-30 text-3xl font-black -translate-x-1/2 translate-y-1/2 left-1/2 text-primary-foreground ">
        {user.score}
      </h1>
      {/* <div className="absolute top-0 left-0 w-48 h-56 scale-75 translate-y-2 bg-white rounded-sm opacity-75 translate-x-1/3" />
<div className="absolute top-0 right-0 w-48 h-56 scale-75 translate-y-2 bg-white rounded-sm opacity-75 -translate-x-1/3" /> */}
    </div>
  );
};

export { Top1, Top2, Top3 };
