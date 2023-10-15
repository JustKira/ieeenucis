"use client";
import { quizApi } from "@/lib/redux/api/quizApi";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { dateWithIn, hasDatePassed, isDateMatch } from "../lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { Separator } from "./ui/separator";
import { UserQuiz } from "@/types";
import { QuickLoader } from "./ui/loaders";

const YourQuizObject = ({ d, now }: { d: UserQuiz; now: Date }) => {
  const [start, setStart] = useState<boolean>(false);
  const [recalQuiz, recalQuizRes] = quizApi.useRecalQuizMutation();

  useEffect(() => {
    if (d.QuizSchedule?.startDate) {
      dateWithIn(d.QuizSchedule?.startDate).then((v) => {
        setStart(v);
      });
    }

    const attendedAt = new Date(Date.parse(d.attendedAt + "Z"));

    const time =
      attendedAt.getTime() +
      (d.QuizSchedule?.duration ?? 0) * 60000 -
      (now?.getTime() ?? 0);

    if (time > 0 && d.submitted !== true && d.attended !== false) return;
    recalQuiz(d.id);
  }, []);

  if (d.attended && d.submitted) {
    return (
      <Card className="opacity-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-light">
            id {d.id} {d.QuizSchedule?.name}
            <Badge>{"Submitted"}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h1>{`${d.autoGrade} / ${d.Quiz?.totalMarks}`}</h1>
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
  }
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-light">
          id {d.Quiz?.id} {d.QuizSchedule?.name}
          <Badge>{d.attended ? "Attended" : "Not Attended"}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {d.QuizSchedule?.startDate ? (
          <>
            {start ? (
              <>
                <Link href={`/quiz/${d.id}`} className="py-1">
                  <Button className="h-8">
                    {d.attended ? <>{"Continue"}</> : <>{"Start"}</>}
                  </Button>
                </Link>
                <Separator className="my-4" />
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
};

function YourQuiz() {
  const { data } = quizApi.useUserQuizQuery();
  const [sortedData, setSortedData] = useState<UserQuiz[]>([]);
  const [now, setNow] = useState<Date>();

  useEffect(() => {
    async function getTime() {
      const response = await fetch(`${window.location.origin}/api/timer`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          updater: Math.random(),
        }),
      });

      if (response.ok) {
        const serverTimeData = await response.json();
        setNow(new Date(serverTimeData.now));
      }
    }

    getTime();
  }, []);
  useEffect(() => {
    // Sort the UserQuiz data by startDate in ascending order
    if (data?.data) {
      const sorted = data.data.slice().sort((a, b) => {
        if (a.QuizSchedule?.startDate && b.QuizSchedule?.startDate) {
          return (
            //@ts-ignore
            new Date(a.QuizSchedule.startDate) -
            //@ts-ignore
            new Date(b.QuizSchedule.startDate)
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
      {now ? (
        <>
          {sortedData.reverse().map((d) => {
            return <YourQuizObject d={d} now={now} />;
          })}
        </>
      ) : (
        <>
          <QuickLoader loading />
        </>
      )}
    </div>
  );
}

export default YourQuiz;
