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
      <CardContent className="grid grid-cols-3 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <QuizCodeForm />
            <YourQuiz />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quiz</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </CardContent>
    </>
  );
}
