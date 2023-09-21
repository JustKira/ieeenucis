import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";

import { QuizAnswerSchema } from "@/app/quiz/[id]/page";

import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Label } from "../label";
function Tf({
  index,
  qid,
  question,
  trigger,
  form,
}: {
  index: number;
  qid: number;
  question: string;
  trigger: () => void;
  form: QuizAnswerSchema;
}) {
  useEffect(() => {
    form.setValue(`${index}.type`, "TF");
    form.setValue(`${index}.id`, qid);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Q{index + 1}</CardTitle>
        <CardDescription>{question}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={(v) => {
            form.setValue(`${index}.answer`, v === "true" ? true : false);
            trigger();
          }}
          defaultValue={form.getValues(`${index}.answer`)?.toString() ?? ""}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={"true"} id={"true"} />

            <Label className="font-normal">True</Label>
          </div>{" "}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={"false"} id={"false"} />

            <Label className="font-normal">False</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

export default Tf;
