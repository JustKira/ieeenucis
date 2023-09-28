"use client";
import React, { useEffect } from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Card customClick={(name, id) => console.log(name, id)} />
    </div>
  );
};

export default page;

interface CardProps {
  customClick: (
    name?: string,
    id?: string
  ) => void | { name: string; id: string };
}

const Card: React.FC<CardProps> = ({ customClick }) => {
  return (
    <button
      onClick={() => {
        customClick("asdasd", "123123");
      }}
    >
      asdasdasd
    </button>
  );
};
