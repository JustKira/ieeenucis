"use client";
import { Submission } from "@/types";
import { Diamond, Square, Trophy } from "lucide-react";
import React, { useState } from "react";
import { motion as m } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const KaggleListRenderer: React.FC<{
  submissions: Submission[];
  reward: number;
  text: string;
}> = ({ submissions, reward, text }) => {
  return (
    <div className="flex mb-16 text-primary-foreground">
      <div
        className={`flex flex-col justify-between mt-6 items-center w-[12.5%] `}
        style={{
          height: `${
            reward <= 3 ? reward * (96 + 12) - 48 : reward * (96 + 12) - 12
          }px`,
        }}
      >
        {/* <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <m.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    ease: "easeInOut",
                    delay: 0.15,
                    duration: 0.25,
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { ease: "circOut", delay: 0, duration: 0.25 },
                }}
              >
                <Trophy className="flex-initial w-16 h-16 p-2 text-blue-500 transition-all duration-300 border-4 border-blue-500 rounded-full hover:text-white hover:bg-blue-500" />
              </m.div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-white/75 backdrop-blur-lg rounded-lg w-[200px] text-black p-2"
                sideOffset={5}
              >
                {text}
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider> */}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <m.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    ease: "easeInOut",
                    delay: 0.15,
                    duration: 0.25,
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { ease: "circOut", delay: 0, duration: 0.25 },
                }}
              >
                <Trophy className="flex-initial w-16 h-16 p-2 text-blue-500 transition-all duration-300 border-4 border-blue-500 rounded-full hover:text-white hover:bg-blue-500" />
              </m.div>
            </TooltipTrigger>
            <TooltipContent className="relative z-[999]">
              <p> {text}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {reward <= 0 ? (
          <></>
        ) : (
          <>
            {" "}
            <m.div
              className="flex-grow w-1 bg-blue-500"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.35,
                ease: "easeInOut",
              }}
            />
            <m.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.15,
                ease: "backInOut",
              }}
              className="flex-initial w-8 h-8 p-2 border-4 border-blue-500 rounded-full"
            />
          </>
        )}
      </div>
      <div className="flex flex-col w-3/4 gap-3">
        {submissions.map((submission, id) => {
          return (
            <>
              <m.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.25 * id,
                  ease: "easeOut",
                }}
                key={id}
                className={`relative flex items-center justify-between flex-grow h-24 px-4 bg-gradient-to-r ${
                  id < 3
                    ? ` ${
                        id === 0
                          ? "via-blue-500 to-cyan-500  from-blue-600"
                          : "from-blue-600 to-cyan-500 "
                      }`
                    : "from-blue-600 to-blue-500"
                } rounded-sm overflow-clip`}
              >
                <div className="flex items-center gap-2">
                  <div className="relative z-50 w-16 h-16 mx-2">
                    <>
                      {id === 0 ? (
                        <>
                          <Trophy
                            size={90}
                            className="absolute left-0 -translate-y-1/2 -translate-x-0 opacity-10 top-1/2"
                          />
                          <Trophy
                            size={90}
                            className="absolute left-0 -translate-x-4 -translate-y-1/2 opacity-30 top-1/2"
                          />
                          <Trophy
                            size={90}
                            className="absolute left-0 -translate-x-12 -translate-y-1/2 opacity-90 top-1/2"
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                    <>
                      {id < 3 ? (
                        <>
                          <Diamond
                            className="absolute text-blue-500 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            size={75}
                          />
                          <Diamond
                            className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 fill-primary-foreground"
                            size={64}
                          />
                          <h1 className="absolute text-3xl font-bold text-blue-500 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            {id + 1}
                          </h1>{" "}
                        </>
                      ) : (
                        <>
                          <Diamond
                            className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            size={64}
                          />
                          <h1 className="absolute text-2xl font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            {id + 1}
                          </h1>
                        </>
                      )}
                    </>
                  </div>
                  <m.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: 0.3 * id,
                      ease: "easeOut",
                    }}
                    className="relative z-50 text-4xl font-medium"
                  >
                    {submission.teamName}
                  </m.h1>
                </div>
                <m.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: 0.3 * id,
                    ease: "easeOut",
                  }}
                  className="relative z-50 flex items-center justify-center h-24 text-2xl font-light text-center"
                >
                  <h2>{submission.score.slice(0, 5)}</h2>
                </m.div>
                {id < 3 ? (
                  <>
                    <img
                      alt=""
                      className={`absolute right-0 blur-2xl `}
                      src={`/k.png`}
                    />
                  </>
                ) : (
                  <></>
                )}
              </m.div>
              <>
                {" "}
                {id === 2 ? (
                  <div className="w-full h-1 my-4 bg-blue-500/75"></div>
                ) : (
                  <></>
                )}
              </>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default KaggleListRenderer;
