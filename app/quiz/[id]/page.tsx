"use client";
import { usersApi } from "@/lib/redux/api/usersApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { quizApi } from "@/lib/redux/api/quizApi";
import Mcq from "../../../components/ui/quiz/mcq";
import Timer from "@/components/ui/quiz/timer";
import { object, z } from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import Tf from "@/components/ui/quiz/tf";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Content } from "next/font/google";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { QuizAnswers, Question } from "@/types";
import { useRouter } from "next/navigation";

const formSchema = z
  .discriminatedUnion("type", [
    z.object({
      type: z.literal("MCQ"),
      id: z.number(),
      answer: z.number().nullable().default(null),
    }),
    z.object({
      type: z.literal("MULTI"),
      id: z.number(),
      answers: z
        .number()
        .array()
        .refine((d) => d.includes(1), {
          message: "At least one answer is required for MULTI type",
        }),
    }),
    z.object({
      type: z.literal("TF"),
      id: z.number(),
      answer: z.boolean().nullable().default(null),
    }),
    z.object({ type: z.literal("TEXT"), id: z.number(), answer: z.string() }),
  ])
  .array();

export type QuizAnswerSchema = UseFormReturn<z.infer<typeof formSchema>>;
function QuizLanchedPage() {
  const { id } = useParams();
  const [quizAnswerUpdate] = usersApi.useUpdateUserQuizMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const userQuizRes = usersApi.useGetUserQuizQuery(id as string);
  const [submitQuiz, submitQuizRes] = quizApi.useSubmitQuizMutation();
  const [allAnswerd, setAllAnswerd] = useState<boolean>(false);
  const [getQuizQuestions, getQuizQuestionsRes] =
    quizApi.useLazyGetQuizQuestionsQuery();

  useEffect(() => {
    setAllAnswerd(areAllObjectsAnswered());
  }, []);

  useEffect(() => {
    if (userQuizRes.data?.data.QuizSchedule?.quizId) {
      getQuizQuestions(userQuizRes.data?.data.QuizSchedule?.quizId).then(() => {
        Object.values(form.getValues()).map((v, i) => {
          const matchingItem: QuizAnswers = userQuizRes.data?.data.answers.find(
            (x: QuizAnswers) => x.id === v.id
          );
          if (matchingItem) {
            if (matchingItem.type === "MCQ") {
              form.setValue(`${i}.answer`, matchingItem.answer ?? null);
            }
            if (matchingItem.type === "MULTI") {
              form.setValue(`${i}.answers`, matchingItem.answers ?? []);
            }
            if (matchingItem.type === "TF") {
              form.setValue(`${i}.answer`, matchingItem.answer ?? null);
            }
          }
        });
        setAllAnswerd(areAllObjectsAnswered());
      });
    }
  }, [userQuizRes.data?.data.Quiz]);

  if (userQuizRes.isLoading && getQuizQuestionsRes.isLoading) {
    return <></>;
  }

  React.useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {});
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const QuizRenderer = ({
    qid,
    question,
    index,
  }: {
    qid: number;
    question: Question;
    index: number;
  }) => {
    switch (question.object.type) {
      case "MCQ":
        return (
          <Mcq
            trigger={() => {
              if (userQuizRes.data?.data.QuizSchedule?.quizId) {
                const qanswers: any = Object.values(form.getValues()).map(
                  (v) => {
                    if (v) {
                      return { ...v };
                    }
                  }
                );
                setAllAnswerd(areAllObjectsAnswered());
                quizAnswerUpdate({
                  quizId: Number(id),
                  quizAnswers: qanswers,
                });
              }
            }}
            qid={qid}
            form={form}
            index={index}
            question={question.question}
            object={question.object}
          />
        );
      case "MULTI":
        return (
          <Mcq
            trigger={() => {
              if (userQuizRes.data?.data.QuizSchedule?.quizId) {
                const qanswers: any = Object.values(form.getValues()).map(
                  (v) => {
                    if (v) {
                      return { ...v };
                    }
                  }
                );
                setAllAnswerd(areAllObjectsAnswered());
                quizAnswerUpdate({
                  quizId: Number(id),
                  quizAnswers: qanswers,
                });
                console.log(qanswers);
              }
            }}
            qid={qid}
            form={form}
            index={index}
            question={question.question}
            object={question.object}
          />
        );
      case "TF":
        return (
          <Tf
            trigger={() => {
              if (userQuizRes.data?.data.QuizSchedule?.quizId) {
                const qanswers: any = Object.values(form.getValues()).map(
                  (v) => {
                    if (v) {
                      return { ...v };
                    }
                  }
                );
                setAllAnswerd(areAllObjectsAnswered());
                quizAnswerUpdate({
                  quizId: Number(id),
                  quizAnswers: qanswers,
                });
              }
            }}
            qid={qid}
            form={form}
            index={index}
            question={question.question}
          />
        );
      default:
        return <></>;
    }
  };

  function areAllObjectsAnswered() {
    if (Object.values(form.getValues()).length === 0) {
      return false;
    }
    for (const value of Object.values(form.getValues())) {
      if (value.type === "MCQ" && value.answer === null) {
        return false;
      } else if (
        value.type === "MULTI" &&
        (!value.answers || !value.answers.includes(1))
      ) {
        return false;
      } else if (value.type === "TF" && value.answer === null) {
        return false;
      } else if (value.type === "TEXT" && value.answer === "") {
        return false;
      }
    }
    return true;
  }

  return (
    <div className="flex flex-col items-start p-2 xl:flex-row">
      <div className="sticky z-50 flex flex-col gap-4 top-24 lg:px-2">
        <div className=" w-60">
          {userQuizRes.data?.data?.attendedAt &&
          userQuizRes.data?.data?.QuizSchedule.duration ? (
            <Timer
              startDate={userQuizRes.data?.data?.attendedAt}
              duration={userQuizRes.data?.data?.QuizSchedule.duration}
            />
          ) : (
            <></>
          )}
        </div>
        <Card className="hidden xl:block">
          <CardHeader>
            <CardTitle>Question List</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {getQuizQuestionsRes.data?.data.map((d, i) => {
                const QuestionChecker = () => {
                  switch (d.Question?.questionObject.object.type) {
                    case "MCQ":
                      return (
                        <>
                          {form.watch(`${i}.answer`) !== undefined ? (
                            <Icon
                              icon={"ic:round-circle"}
                              className="w-4 h-4"
                            />
                          ) : (
                            <Icon
                              icon={"ic:outline-circle"}
                              className="w-4 h-4"
                            />
                          )}
                        </>
                      );
                    case "MULTI":
                      let answerd = form
                        .watch(`${i}.answers`)
                        ?.some((num) => num === 1);
                      return (
                        <>
                          {answerd ? (
                            <Icon
                              icon={"ic:round-circle"}
                              className="w-4 h-4"
                            />
                          ) : (
                            <Icon
                              icon={"ic:outline-circle"}
                              className="w-4 h-4"
                            />
                          )}
                        </>
                      );
                    case "TF":
                      return (
                        <>
                          {form.watch(`${i}.answer`) !== undefined ? (
                            <Icon
                              icon={"ic:round-circle"}
                              className="w-4 h-4"
                            />
                          ) : (
                            <Icon
                              icon={"ic:outline-circle"}
                              className="w-4 h-4"
                            />
                          )}
                        </>
                      );
                    default:
                      return <></>;
                  }
                };

                return (
                  <li className="flex items-center gap-2">
                    {" "}
                    <QuestionChecker />
                    <h1 className="font-light text-foreground/75">
                      Question {i + 1}
                    </h1>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
      <Form {...form}>
        <form className="container relative">
          <div className="flex flex-col gap-8 pb-4 ">
            {getQuizQuestionsRes.data?.data.map((d, i) => {
              if (d.Question) {
                return (
                  <div key={i}>
                    <QuizRenderer
                      qid={d.questionId}
                      index={i}
                      question={d.Question?.questionObject}
                    />
                  </div>
                );
              } else {
                return <></>;
              }
            })}
            <Button
              variant={"default"}
              disabled={!allAnswerd || submitQuizRes.isLoading}
              onClick={async () => {
                if (!userQuizRes.data?.data.QuizSchedule.quizId) return;
                submitQuiz({
                  body: form.getValues(),
                  quizId: userQuizRes.data?.data.QuizSchedule.quizId,
                  userQuizId: Number(id),
                });
                router.push("/dashboard/quiz");
                window.location.reload();
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default QuizLanchedPage;
