"use client";
import { Button } from "@/components/ui/button";

import useCountdownTimer from "@/lib/hooks/useCountdownTimer";
import { quizApi } from "@/lib/redux/api/quizApi";
import { usersApi } from "@/lib/redux/api/usersApi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function QuizLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();

  const userQuizRes = usersApi.useGetUserQuizQuery(id as string);
  const [attendQuiz, attendQuizRes] = quizApi.useAttendQuizMutation();

  if (userQuizRes.isLoading || attendQuizRes.isLoading) {
    return <div>loading...</div>;
  }

  if (!userQuizRes.data?.data) {
    return <div>Quiz Not Found</div>;
  }

  if (!userQuizRes.data?.data?.attended) {
    return (
      <Button
        onClick={() => {
          attendQuiz(id as string);
        }}
      >
        Attend Quiz
      </Button>
    );
  }

  return <div>{children}</div>;
}

export default QuizLayout;
