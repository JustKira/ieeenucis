"use client";
import { quizApi } from "@/lib/redux/api/quizApi";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

import { isDateMatch } from "../lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

function YourQuiz() {
  const { data } = quizApi.useUserQuizQuery();

  return (
    <div className="flex flex-col gap-1 py-2">
      {data?.data?.map((d) => (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {d.QuizSchedule?.name}
              <Badge>{d.attended ? "Attended" : "Not Attended"}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {d.QuizSchedule?.startDate ? (
              <>
                {isDateMatch(d.QuizSchedule?.startDate) ? (
                  <Link href={`quiz/${d.id}`}>
                    <Button>Start</Button>
                  </Link>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default YourQuiz;
