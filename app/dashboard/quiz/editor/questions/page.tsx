import { CardContent } from "@/components/ui/card";
import React from "react";
import CreateQuestionForm from "./CreateQuestionForm";
import DeleteQuestions from "./DeleteQuestions";

export default function QuestionPage() {
  return (
    <CardContent className="flex gap-4">
      <CreateQuestionForm />
      <DeleteQuestions />
    </CardContent>
  );
}
