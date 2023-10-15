import { Question } from "@/types";
import { Icon } from "@iconify/react";
import { marked } from "marked";
import React from "react";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
const QuestionRenderer = ({ questionObject }: { questionObject: Question }) => {
  if (questionObject.object.type === "MCQ") {
    return (
      <ul className="font-sm font-light [&>li]:flex [&>li]:gap-2 opacity-50">
        {questionObject.object.choices.map((c, id) => (
          <li key={id}>
            <Icon
              icon={
                c.isAnswer
                  ? "material-symbols:circle"
                  : "material-symbols:circle-outline"
              }
            />
            {c.choice}
          </li>
        ))}
      </ul>
    );
  }

  if (questionObject.object.type === "MULTI") {
    return (
      <ul className="font-sm font-light [&>li]:flex [&>li]:gap-2 opacity-50">
        {questionObject.object.choices.map((c, id) => (
          <li key={id}>
            <Icon
              icon={
                c.isAnswer
                  ? "material-symbols:circle"
                  : "material-symbols:circle-outline"
              }
            />
            {c.choice}
          </li>
        ))}
      </ul>
    );
  }

  if (questionObject.object.type === "TF") {
    return (
      <h1 className="text-xs font-light opacity-50">{`answer ${questionObject.object.isAnswer}`}</h1>
    );
  }
  return <></>;
};
function QuizQuestionAnswerRenderer({
  questionObject,
}: {
  questionObject: Question;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex flex-col gap-2">
          <div className="flex justify-between w-full gap-2">
            <Badge className="flex gap-2 w-fit" variant={"ghost"}>
              {questionObject.object.type}
            </Badge>
          </div>
          <div
            className="prose-sm"
            dangerouslySetInnerHTML={{
              __html: marked.parse(questionObject.question ?? ""),
            }}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li className="flex gap-1">
            <QuestionRenderer questionObject={questionObject} />
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default QuizQuestionAnswerRenderer;
