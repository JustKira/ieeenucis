"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collectionApi } from "@/lib/redux/api/collectionApi";
import { questionApi } from "@/lib/redux/api/questionApi";
import { Question } from "@/types";
import { Icon } from "@iconify/react";
import { useDebouncedState } from "@react-hookz/web";

import { marked } from "marked";

import React, { useEffect, useState } from "react";

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

function DeleteQuestions() {
  const { data, isLoading } = collectionApi.useGetCollectionQuery();
  const [collectionId, setCollectionId] = useState<number | null>(null);
  const [getQuestions, getQuestionRes] = questionApi.useLazyGetQuestionsQuery();
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
  const [removeQuestions, removeQuestionRes] =
    questionApi.useRemoveQuestionMutation();
  useEffect(() => {
    if (collectionId) {
      getQuestions({ id: collectionId });
    }
    return () => {};
  }, [collectionId]);

  useEffect(() => {
    if (searchQuery && filter) {
      const filteredQuestions = filter.filter((q) =>
        q.questionObject.question
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilter(filteredQuestions);
    } else {
      if (getQuestionRes.data?.data) setFilter(getQuestionRes.data?.data);
    }
  }, [searchQuery, getQuestionRes.data?.data]);

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
    <Card className="hidden w-full lg:block">
      <CardHeader>
        <CardTitle>Delete</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between w-full gap-8">
          <div className="flex flex-col gap-2 w-[580px]">
            <Label>Collection</Label>
            <Select onValueChange={(e) => setCollectionId(Number(e))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Collection" />
              </SelectTrigger>

              <SelectContent>
                <CollectionSelectorItems />
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-1 py-2">
          <Label>Search</Label>
          <Input onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <ul className="flex flex-col gap-2 py-4">
          {filter.map((q, id) => (
            <li className="relative" key={id}>
              <Button
                className="absolute z-50 right-4 top-4"
                disabled={removeQuestionRes.isLoading}
                onClick={() => {
                  removeQuestions({ id: collectionId ?? 0, qid: q.id });
                }}
                variant={"destructive"}
              >
                Delete
              </Button>
              <button className="w-full">
                <Card className={`p-3 flex flex-col gap-2 items-start`}>
                  <Badge className="w-fit" variant={"ghost"}>
                    {q.questionObject.object.type}
                  </Badge>
                  <div className="flex flex-col gap-2 text-left">
                    <div
                      className="prose-sm"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(q.questionObject.question ?? ""),
                      }}
                    />

                    <QuestionRenderer questionObject={q.questionObject} />
                  </div>
                </Card>
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default DeleteQuestions;
