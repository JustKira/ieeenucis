"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { QuickLoader } from "@/components/ui/loaders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { quizApi } from "@/lib/redux/api/quizApi";
import { Question, QuizAnalytics, QuizAnalyticsItems } from "@/types";
import { Icon } from "@iconify/react";
import { get } from "http";
import { marked } from "marked";
import React, { useEffect, useState } from "react";
import { object } from "zod";

const AnalyticsRenderer = ({
  quizAnalyics,
}: {
  quizAnalyics: QuizAnalyticsItems;
}) => {
  if (quizAnalyics.type === "MCQ" || quizAnalyics.type === "TF") {
    return (
      <ul className="flex flex-col gap-2 py-2 text-xs">
        <li>
          Correct Percentage{" "}
          <span>
            {(quizAnalyics.correctPerc * 100).toFixed(2)}
            {"%"}
          </span>
        </li>
        <li className="flex gap-3 [&>h1]:flex [&>h1]:gap-2 items-center">
          <Badge
            className="flex gap-2 [&>h1]:flex [&>h1]:gap-2 [&>h1]:w-8"
            variant={"ghost"}
          >
            Total Answers
            <h1>
              <Icon icon="icon-park-solid:correct" />{" "}
              <span>{quizAnalyics.true}</span>
            </h1>
            <h1>
              <Icon icon="icon-park-solid:big-x" />{" "}
              <span>{quizAnalyics.false}</span>
            </h1>
          </Badge>
        </li>
      </ul>
    );
  }
  if (quizAnalyics.type === "MULTI") {
    return (
      <ul className="flex flex-col gap-2 py-2 text-xs">
        <li>
          Correct Percentage{" "}
          <span>
            {(quizAnalyics.correctPerc * 100).toFixed(2)}
            {"%"}
          </span>
        </li>
        <li className="flex gap-3 [&>h1]:flex [&>h1]:gap-2 items-center">
          <Badge
            className="flex gap-2 [&>h1]:flex [&>h1]:gap-2 [&>h1]:w-8"
            variant={"ghost"}
          >
            Total Answers
            <h1>
              <Icon icon="icon-park-solid:correct" />{" "}
              <span>{quizAnalyics.true}</span>
            </h1>
            <h1>
              <Icon icon="icon-park-solid:big-x" />{" "}
              <span>{quizAnalyics.false}</span>
            </h1>
          </Badge>
        </li>
        <div className="flex items-center justify-start w-full gap-4 py-2">
          <h1 className="w-full whitespace-nowrap">Analytics Per Answer</h1>{" "}
          <Separator className="w-[85%]" />
        </div>
        <ul className="flex flex-col gap-1">
          {quizAnalyics.correctAnswers.map((q) => (
            <li className="flex gap-3 [&>h1]:flex [&>h1]:gap-2 [&>h1]:w-32">
              <h1>
                <Icon icon="icon-park-solid:correct" /> <span>{q.true}</span>
              </h1>
              <h1>
                <Icon icon="icon-park-solid:big-x" /> <span>{q.false}</span>
              </h1>
            </li>
          ))}
        </ul>
      </ul>
    );
  }
  return <></>;
};

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

function page() {
  const { data } = quizApi.useGetSchedulesQuery();
  const [selected, setSelected] = useState<number | null>(null);
  const [getAnalytic, getAnalyticRes] = quizApi.useLazyGetQuizAnalyticsQuery();
  const [getQuestions, getQuestionsRes] = quizApi.useLazyGetQuestionsQuery();
  const [generateAnalytics, generateAnalyticsRes] =
    quizApi.useGenerateQuizAnalyticsMutation();
  useEffect(() => {
    if (selected) {
      getAnalytic(selected);
      getQuestions(selected);
    }
  }, [selected]);

  useEffect(() => {
    console.log(getAnalyticRes.data);
  }, [getAnalyticRes.data]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <div className="flex items-center w-full gap-2">
          <Select onValueChange={(v) => setSelected(Number(v))}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Quiz Schedule" />
            </SelectTrigger>
            <SelectContent>
              {data?.data?.map((s) => (
                <SelectItem value={s.id.toString()}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div>
            <Button
              size={"sm"}
              disabled={!selected}
              onClick={() => {
                if (selected) {
                  generateAnalytics(selected);
                }
              }}
            >
              Reload
            </Button>
          </div>
        </div>
        <h1 className="text-xs font-light opacity-75">
          {" "}
          Use the "Reload" function sparingly, only when no Analytics Data has
          been rendered, as it places a significant load on system resources.
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        {generateAnalyticsRes.isLoading ? <QuickLoader loading /> : <></>}
        {getAnalyticRes.data?.data?.analytics
          .slice()
          ?.sort((a, b) => a.correctPerc - b.correctPerc)
          .map((d) => {
            console.log(d);
            console.log(getQuestionsRes.data?.data);
            const question = getQuestionsRes.data?.data.find(
              (q) => q.id === d.questionId
            );

            if (!question) return <></>;
            return (
              <Card>
                <CardHeader>
                  <CardDescription className="flex flex-col gap-2">
                    <div className="flex justify-between w-full gap-2">
                      <Badge className="flex gap-2 w-fit" variant={"ghost"}>
                        {question.questionObject.object.type}
                      </Badge>
                      <h1 className="text-xs font-light opacity-70 hover:opacity-100">
                        ID {question.id}
                      </h1>
                    </div>
                    <div
                      className="prose-sm"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(
                          question.questionObject.question ?? ""
                        ),
                      }}
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul>
                    <li className="flex gap-1">
                      <QuestionRenderer
                        questionObject={question.questionObject}
                      />
                    </li>
                    <li>
                      <AnalyticsRenderer quizAnalyics={d} />
                    </li>
                  </ul>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default page;
