"use client";
import { Button } from "@/components/ui/button";
import useCountdownTimer from "@/lib/hooks/useCountdownTimer";
import { quizApi } from "@/lib/redux/api/quizApi";
import { usersApi } from "@/lib/redux/api/usersApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { hasDatePassed } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

function QuizLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();

  const userQuizRes = usersApi.useGetUserQuizQuery(id as string);
  const [attendQuiz, attendQuizRes] = quizApi.useAttendQuizMutation();

  const router = useRouter();
  const [timePassed, setTimePassed] = useState(false);
  const [rulesRead, setRulesRead] = useState(false);
  // Use useEffect to set the state to true after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimePassed(true);
    }, 7000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);
  const { hasPassedTimer } = useCountdownTimer(
    userQuizRes.data?.data?.attendedAt,
    userQuizRes.data?.data?.QuizSchedule.duration
  );

  if (userQuizRes.isLoading || attendQuizRes.isLoading) {
    return <div>loading...</div>;
  }

  if (!userQuizRes.data?.data) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div>Quiz Not Found</div>
      </div>
    );
  }

  if (userQuizRes.data?.data.submitted) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1>Quiz Have Been Submitted</h1>
      </div>
    );
  }

  if (hasDatePassed(userQuizRes.data?.data.QuizSchedule?.startDate)) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1>Quiz Access Denied</h1>
      </div>
    );
  }

  if (hasPassedTimer) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1>Times Out</h1>
      </div>
    );
  }

  if (!userQuizRes.data?.data?.attended) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <Card className="p-4">
          <div className="flex flex-col prose dark:prose-invert">
            <h3>Notes</h3>
            <ol>
              <li>
                Once you click "Attend," a countdown will begin. If it reaches
                zero and you haven't submitted the quiz, your answers won't be
                calculated.
              </li>
              <li>
                In multi-question quizzes, if you select all answers, it will
                result in a negative score.
              </li>
              <li>
                You can reload the page, close the tab, and open it again as
                needed.
              </li>
              <li>
                After clicking "Submit," you can't edit or access your quiz
                again.
              </li>
              <li>
                You can't submit quizzes if not all questions are answered.
              </li>
            </ol>
          </div>

          <div className="flex flex-col gap-1 py-8">
            <h4>I have read all notes and i understand it </h4>
            <Switch
              disabled={!timePassed}
              onCheckedChange={(e) => {
                setRulesRead(e);
              }}
            />
          </div>
          <Button
            disabled={!rulesRead}
            onClick={async () => {
              await attendQuiz(id as string);
              window.location.reload();
            }}
          >
            Attend Quiz
          </Button>
        </Card>
      </div>
    );
  }

  return <div className="pt-24">{children}</div>;
}

export default QuizLayout;
