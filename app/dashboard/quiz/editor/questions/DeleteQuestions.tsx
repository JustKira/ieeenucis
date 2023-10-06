"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import { marked } from "marked";

import React, { useEffect, useState } from "react";

function DeleteQuestions() {
  const { data, isLoading } = collectionApi.useGetCollectionQuery();
  const [collectionId, setCollectionId] = useState<number | null>(null);
  const [getQuestions, getQuestionRes] = questionApi.useLazyGetQuestionsQuery();
  const [removeQuestions, removeQuestionRes] =
    questionApi.useRemoveQuestionMutation();
  useEffect(() => {
    if (collectionId) {
      getQuestions({ id: collectionId });
    }
    return () => {};
  }, [collectionId]);
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
    <Card className="w-full">
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
        <ul className="flex flex-col gap-2 py-4">
          {getQuestionRes.data?.data?.map((q, id) => (
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
                  <div className="text-left">
                    <div
                      className="prose-sm"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(q.questionObject.question ?? ""),
                      }}
                    />
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
