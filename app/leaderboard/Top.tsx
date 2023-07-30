"use client";
import { User } from "@/types";
import { Award, Crown, Hexagon, Trophy } from "lucide-react";
import React from "react";
import { GiLibertyWing } from "react-icons/gi";
import { GrTrophy } from "react-icons/gr";
interface TopProps {
  user: Partial<User>;
}

const Top1: React.FC<TopProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="absolute h-56 w-48 bg-white opacity-20 top-0 left-0 blur-3xl animate-pulse" />
      <div className="relative h-56 w-48 z-20 bg-foreground rounded-lg text-primary-foreground flex p-4 items-center flex-col justify-center overflow-clip">
        <Hexagon className="absolute bottom-0 translate-y-1/2" size={100} />
        <h1 className="font-bold text-3xl text-center uppercase">
          {user.firstname} {user.lastname}
        </h1>
        <h1 className="absolute text-5xl bottom-0 font-light translate-y-full">
          {user.score}
        </h1>
        <div />
        <Crown
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-primary-foreground"
          size={125}
        />
        <Hexagon
          className="absolute bottom-0 left-0 translate-y-1/2  text-primary-foreground drop-shadow-md"
          size={50}
        />{" "}
        <Hexagon
          className="absolute bottom-0 right-0 translate-y-1/2  text-primary-foreground drop-shadow-md"
          size={50}
        />
      </div>
      <GiLibertyWing
        className="absolute top-0 -translate-y-1/2 right-0 translate-x-full"
        size={250}
      />{" "}
      <GiLibertyWing
        className="absolute scale-y-100 -scale-x-100 top-0 -translate-y-1/2 left-0 -translate-x-full"
        size={250}
      />
      <GiLibertyWing
        className="absolute blur-3xl opacity-75 top-0 -translate-y-1/2 right-0 translate-x-full"
        size={250}
      />{" "}
      <GiLibertyWing
        className="absolute blur-3xl opacity-75 scale-y-100 -scale-x-100 top-0 -translate-y-1/2 left-0 -translate-x-full"
        size={250}
      />
      <Crown
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2  text-primary  drop-shadow-md"
        size={125}
      />{" "}
      <Crown
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2  text-primary  drop-shadow-md blur-2xl animate-pulse"
        size={125}
      />
      <Hexagon
        fill="current"
        className="absolute bottom-0  left-1/2 -translate-x-1/2 translate-y-1/2  text-primary-foreground drop-shadow-md fill-foreground"
        size={100}
      />
      <Hexagon
        className="absolute bottom-0 translate-y-1/2  text-primary drop-shadow-md"
        size={50}
      />{" "}
      <Hexagon
        className="absolute bottom-0 translate-y-1/2 right-0 text-primary drop-shadow-md"
        size={50}
      />
      <h1 className="absolute bottom-0 font-black text-3xl left-1/2 -translate-x-1/2 translate-y-1/2 z-30 text-primary-foreground ">
        {user.score}
      </h1>
      {/* <div className="absolute h-56 w-48 bg-white top-0 left-0 translate-x-1/3 translate-y-2 scale-75 opacity-75 rounded-sm" />
      <div className="absolute h-56 w-48 bg-white top-0 right-0 -translate-x-1/3  translate-y-2 scale-75 opacity-75 rounded-sm" /> */}
    </div>
  );
};
const Top2: React.FC<TopProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="absolute h-56 w-48 bg-white opacity-20 top-0 left-0 blur-xl animate-pulse" />
      <div className="relative h-56 w-48 z-20 bg-foreground rounded-lg text-primary-foreground flex p-4 items-center flex-col justify-center overflow-clip">
        <Hexagon className="absolute bottom-0 translate-y-1/2" size={100} />
        <h1 className="font-bold text-xl text-center">
          {user.firstname} {user.lastname}
        </h1>
        <h1 className="absolute text-5xl bottom-0 font-light translate-y-full">
          {user.score}
        </h1>
        <div />
        <Award
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-primary-foreground border-primary-foreground rounded-full"
          size={110}
        />
        <Award
          className="absolute top-0 left-1/2 translate-x-1/3 -rotate-12  z-50 text-primary-foreground border-primary-foreground rounded-full"
          size={50}
        />
        <Award
          className="absolute top-0 right-1/2 -translate-x-1/3 rotate-12  z-50 text-primary-foreground border-primary-foreground rounded-full"
          size={50}
        />
        <Hexagon
          className="absolute bottom-0 left-0 translate-y-1/2  text-primary-foreground drop-shadow-md"
          size={50}
        />{" "}
        <Hexagon
          className="absolute bottom-0 right-0 translate-y-1/2  text-primary-foreground drop-shadow-md"
          size={50}
        />
      </div>
      <Award
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2  text-primary  drop-shadow-md"
        size={110}
      />{" "}
      <Award
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2  text-primary  drop-shadow-md blur-2xl opacity-60 animate-pulse"
        size={110}
      />
      <Award
        className="absolute top-0 left-0 rotate-45 -translate-y-2  z-50 text-primary-foreground border-primary-foreground rounded-full"
        size={45}
      />{" "}
      <Award
        className="absolute top-0 right-0 -rotate-45 -translate-y-2  z-50 text-primary-foreground border-primary-foreground rounded-full"
        size={45}
      />
      <h1 className=" absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full  text-primary text-3xl">
        2
      </h1>
      <Hexagon
        fill="current"
        className="absolute bottom-0  left-1/2 -translate-x-1/2 translate-y-1/2  text-primary-foreground drop-shadow-md fill-foreground"
        size={100}
      />
      <Hexagon
        className="absolute bottom-0 translate-y-1/2  text-primary drop-shadow-md"
        size={50}
      />{" "}
      <Hexagon
        className="absolute bottom-0 translate-y-1/2 right-0 text-primary drop-shadow-md"
        size={50}
      />
      <h1 className="absolute bottom-0 font-black text-3xl left-1/2 -translate-x-1/2 translate-y-1/2 z-30 text-primary-foreground ">
        {user.score}
      </h1>
      {/* <div className="absolute h-56 w-48 bg-white top-0 left-0 translate-x-1/3 translate-y-2 scale-75 opacity-75 rounded-sm" />
  <div className="absolute h-56 w-48 bg-white top-0 right-0 -translate-x-1/3  translate-y-2 scale-75 opacity-75 rounded-sm" /> */}
    </div>
  );
};
const Top3: React.FC<TopProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="absolute h-56 w-48 bg-white opacity-20 top-0 left-0 blur-xl animate-pulse" />
      <div className="relative h-56 w-48 z-20 bg-foreground rounded-lg text-primary-foreground flex p-4 items-center flex-col justify-center overflow-clip">
        <Hexagon className="absolute bottom-0 translate-y-1/2" size={100} />
        <h1 className="font-bold text-xl text-center">
          {user.firstname} {user.lastname}
        </h1>
        <h1 className="absolute text-5xl bottom-0 font-light translate-y-full">
          {user.score}
        </h1>
        <div />
        <Award
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-primary-foreground border-primary-foreground rounded-full"
          size={110}
        />
        <Award
          className="absolute top-0 left-1/2 translate-x-1/3 -rotate-12  z-50 text-primary-foreground border-primary-foreground rounded-full"
          size={50}
        />
        <Award
          className="absolute top-0 right-1/2 -translate-x-1/3 rotate-12  z-50 text-primary-foreground border-primary-foreground rounded-full"
          size={50}
        />
        <Hexagon
          className="absolute bottom-0 left-0 translate-y-1/2  text-primary-foreground drop-shadow-md"
          size={50}
        />{" "}
        <Hexagon
          className="absolute bottom-0 right-0 translate-y-1/2  text-primary-foreground drop-shadow-md"
          size={50}
        />
      </div>
      <Award
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2  text-primary  drop-shadow-md"
        size={110}
      />{" "}
      <Award
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2  text-primary  drop-shadow-md blur-2xl opacity-60 animate-pulse"
        size={110}
      />
      <h1 className=" absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full  text-primary text-3xl">
        3
      </h1>
      <Hexagon
        fill="current"
        className="absolute bottom-0  left-1/2 -translate-x-1/2 translate-y-1/2  text-primary-foreground drop-shadow-md fill-foreground"
        size={100}
      />
      <Hexagon
        className="absolute bottom-0 translate-y-1/2  text-primary drop-shadow-md"
        size={50}
      />{" "}
      <Hexagon
        className="absolute bottom-0 translate-y-1/2 right-0 text-primary drop-shadow-md"
        size={50}
      />
      <h1 className="absolute bottom-0 font-black text-3xl left-1/2 -translate-x-1/2 translate-y-1/2 z-30 text-primary-foreground ">
        {user.score}
      </h1>
      {/* <div className="absolute h-56 w-48 bg-white top-0 left-0 translate-x-1/3 translate-y-2 scale-75 opacity-75 rounded-sm" />
<div className="absolute h-56 w-48 bg-white top-0 right-0 -translate-x-1/3  translate-y-2 scale-75 opacity-75 rounded-sm" /> */}
    </div>
  );
};

export { Top1, Top2, Top3 };
