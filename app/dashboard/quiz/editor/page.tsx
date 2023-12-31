"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import CreateQuizForm from "./CreateQuizForm";
import { collectionApi } from "@/lib/redux/api/collectionApi";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { questionApi } from "@/lib/redux/api/questionApi";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { quizApi } from "@/lib/redux/api/quizApi";
import { PostgrestError } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";
import { Question } from "@/types";
import { marked } from "marked";
import { useDebouncedState } from "@react-hookz/web";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

const formSchema = z.object({
  quizName: z.string(),
});

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

export default function EditorPage() {
  const { data, isLoading } = collectionApi.useGetCollectionQuery();
  const [getQuestions, questionsRes] = questionApi.useLazyGetQuestionsQuery();
  const [addQuiz, addQuizRes] = quizApi.useAddQuizMutation();
  const [collectionId, setCollectionId] = useState<number | null>(null);
  const { toast } = useToast();

  const [filter, setFilter] = useState<
    {
      id: number;
      questionObject: Question;
    }[]
  >([]);
  const [searchQuery, setSearchQuery] = useDebouncedState<string | null>(
    null,
    500,
    1000
  );
  const [questions, setQuestions] = useState<
    { id: number; questionObject: Question }[]
  >([]);
  const [totalScore, setTotalScore] = useState<number>(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    if (searchQuery && filter) {
      if (questionsRes.data?.data) {
        const filteredQuestions = questionsRes.data?.data.filter((q) =>
          q.questionObject.question
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
        setFilter(filteredQuestions);
      }
    } else {
      if (questionsRes.data?.data) setFilter(questionsRes.data?.data);
    }
  }, [searchQuery, questionsRes.data?.data]);
  const submitForm = form.handleSubmit((data) => {
    let questionsIds = questions.map((q) => q.id);
    addQuiz({
      quizName: data.quizName,
      totalMarks: totalScore,
      questionsIds: questionsIds,
    });

    let error = addQuizRes.error as PostgrestError | null;

    toast({
      title: error ? "Error" : "Success",
      description: error ? error.message : "Quiz Created",
    });
  });

  useEffect(() => {
    if (collectionId) {
      getQuestions({ id: collectionId });
    }
    return () => {};
  }, [collectionId]);

  const toggleQuestion = (question: {
    id: number;
    questionObject: Question;
  }) => {
    const questionIndex = questions.findIndex((q) => q.id === question.id);
    if (questionIndex === -1) {
      setQuestions([...questions, question]);
      setTotalScore(
        (prevTotalScore) => prevTotalScore + question.questionObject.score
      );
    } else {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(questionIndex, 1);
      setQuestions(updatedQuestions);
      setTotalScore(
        (prevTotalScore) => prevTotalScore - question.questionObject.score
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-[80px] rounded-SM" />
        <Skeleton className="h-8 w-[180px] rounded-lg" />
      </div>
    );
  }
  const CollectionSelectorItems = () => {
    if (data?.data) {
      return (
        <>
          {data.data.map(({ collectionName, id }, key) => (
            <SelectItem key={key} value={id.toString()}>
              {collectionName}
            </SelectItem>
          ))}
        </>
      );
    }
    return <></>;
  };
  return (
    <>
      <CardContent>
        <div className="flex gap-4 ">
          <section className="flex flex-col w-1/2 gap-4">
            <Form {...form}>
              <form onSubmit={submitForm} className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="quizName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quiz Name</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>

                      <FormMessage />
                      <FormDescription>
                        Quiz name will not be displayed to the End User.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <Button className="w-fit" variant={"outline"}>
                  Create
                </Button>
              </form>
            </Form>
            <div className="flex justify-between">
              <h1 className="text-sm font-light">
                Questions <Badge variant={"ghost"}> {questions.length}</Badge>
              </h1>
              <h1 className="text-sm font-light">
                Total Marks <Badge variant={"ghost"}> {totalScore}</Badge>
              </h1>
            </div>
            <ul className="flex flex-col gap-2">
              {questions.map((q, id) => (
                <li key={id}>
                  <Card className={`p-3 flex flex-col gap-2 items-start`}>
                    <div className="flex justify-between w-full gap-2">
                      <Badge className="flex gap-2 w-fit" variant={"ghost"}>
                        {q.questionObject.object.type}
                      </Badge>
                      <h1 className="text-xs font-light opacity-70 hover:opacity-100">
                        ID {q.id}
                      </h1>
                    </div>

                    <div
                      className="prose-sm"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(q.questionObject.question ?? ""),
                      }}
                    />
                  </Card>
                </li>
              ))}
            </ul>
          </section>
          <section className="w-1/2">
            <div className="max-w-xs">
              <Select onValueChange={(e) => setCollectionId(Number(e))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Collection" />
                </SelectTrigger>

                <SelectContent>
                  <CollectionSelectorItems />
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1 py-2">
              <Label>Search</Label>
              <Input onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <ul className="flex flex-col gap-3 py-4">
              {filter.map((q, id) => (
                <li key={id}>
                  <button
                    className="w-full"
                    onClick={() => {
                      toggleQuestion(q);
                    }}
                  >
                    <Card
                      className={`p-3 flex flex-col gap-2 items-start ${
                        questions.find((_q) => _q.id === q.id)
                          ? "bg-primary/25 border-primary/50"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between w-full gap-2">
                        <Badge className="flex gap-2 w-fit" variant={"ghost"}>
                          {q.questionObject.object.type}
                        </Badge>
                        <h1 className="text-xs font-light opacity-70 hover:opacity-100">
                          {" "}
                          ID {q.id}
                        </h1>
                      </div>
                      <div className="text-left">
                        <div
                          className="prose-sm"
                          dangerouslySetInnerHTML={{
                            __html: marked.parse(
                              q.questionObject.question ?? ""
                            ),
                          }}
                        />
                      </div>
                      <QuestionRenderer questionObject={q.questionObject} />
                    </Card>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </CardContent>
    </>
  );
}
