import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuizAnswerSchema } from "@/app/quiz/[id]/page";
import { MCQQuestion, MultiQuestion } from "@/types";

function Mcq({
  index,
  qid,
  question,
  object,
  trigger,
  form,
}: {
  index: number;
  qid: number;
  question: string;
  object: MCQQuestion | MultiQuestion;
  trigger: () => void;
  form: QuizAnswerSchema;
}) {
  useEffect(() => {
    if (object.type === "MULTI") {
      form.setValue(`${index}.type`, "MULTI");
      form.setValue(`${index}.id`, qid);
      return;
    }
    form.setValue(`${index}.type`, "MCQ");
    form.setValue(`${index}.id`, qid);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Q{index + 1}</CardTitle>
        <CardDescription>{question}</CardDescription>
      </CardHeader>
      <CardContent>
        {object.type === "MULTI" ? (
          <div className="flex flex-col gap-2">
            {object.choices.map((c, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox
                  id={i.toString()}
                  checked={
                    form.getValues(`${index}.answers.${i}`) === 1 ? true : false
                  }
                  onCheckedChange={(c) => {
                    if (c) {
                      form.setValue(`${index}.answers.${i}`, 1);
                    } else {
                      form.setValue(`${index}.answers.${i}`, 0);
                    }
                    trigger();
                  }}
                />
                <label
                  htmlFor="terms2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {c.choice}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <RadioGroup
            onValueChange={(v) => {
              form.setValue(`${index}.answer`, Number(v));
              trigger();
            }}
            defaultValue={form.getValues(`${index}.answer`)?.toString() ?? ""}
          >
            {object.choices.map((c, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={i.toString()} id={i.toString()} />

                <Label className="font-normal">{c.choice}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
}

export default Mcq;
