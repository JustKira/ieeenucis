import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import QuizCodeForm from "./QuizCodeForm";
import YourQuiz from "@/components/YourQuiz";

export default function Dashboard() {
  return (
    <>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <QuizCodeForm />
            <YourQuiz />
          </CardContent>
        </Card>
      </CardContent>
    </>
  );
}
