"use client";
import { quizApi } from "@/lib/redux/api/quizApi";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { isDateMatch } from "../lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { Separator } from "./ui/separator";
import { UserQuiz } from "@/types";

function YourQuiz() {
  const { data } = quizApi.useUserQuizQuery();
const [sortedData, setSortedData] = useState<UserQuiz[]>([]);
useEffect(() => {
  // Sort the UserQuiz data by startDate in ascending order
  if (data?.data) {
    const sorted = data.data.slice().sort((a, b) => {
      if (a.QuizSchedule?.startDate && b.QuizSchedule?.startDate) {
        return ( 
          //@ts-ignore
new Date(a.QuizSchedule.startDate) - new Date(b.QuizSchedule.startDate)
        );
      }
      return 0;
    });
    //@ts-ignore
    setSortedData(sorted);
  }
}, [data]);
  return (
    <div className="flex flex-col gap-1 py-2">
      {sortedData.reverse().map((d) => {
        if (d.attended && d.submitted) {
          return <></>;
        }
        return (
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-light">
                {d.QuizSchedule?.name}
                <Badge>{d.attended ? "Attended" : "Not Attended"}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {d.QuizSchedule?.startDate ? (
                <>
                  {isDateMatch(d.QuizSchedule?.startDate) ? (
                    <>
                      <Link href={`quiz/${d.id}`}>
                        <Button className="h-8">Start</Button>
                      </Link>
                      <Separator />
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
              {d.QuizSchedule.startDate ? (
                <h1 className="text-xs font-extralight">
                  {format(new Date(d.QuizSchedule.startDate), "PPP")}
                </h1>
              ) : (
                <></>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default YourQuiz;
