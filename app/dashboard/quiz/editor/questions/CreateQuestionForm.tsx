"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { collectionApi } from "@/lib/redux/api/collectionApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { number, z } from "zod";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { questionApi } from "@/lib/redux/api/questionApi";
import { useToast } from "@/components/ui/use-toast";
import { PostgrestError } from "@supabase/supabase-js";
import { MCQQuestion, MultiQuestion } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marked } from "marked";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  collectionId: z.string(),
  question: z.string().min(7),
  score: z.string(),
  object: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("MCQ"),
      choices: z
        .object({ choice: z.string().min(1), isAnswer: z.boolean() })
        .array(),
    }),
    z.object({
      type: z.literal("MULTI"),
      choices: z
        .object({ choice: z.string().min(1), isAnswer: z.boolean() })
        .array(),
    }),
    z.object({ type: z.literal("TF"), isAnswer: z.boolean().default(false) }),
    z.object({ type: z.literal("TEXT"), format: z.string() }),
  ]),
});

export default function CreateQuestionForm() {
  const { data, isLoading } = collectionApi.useGetCollectionQuery();
  const [addQuestion, addQuestionRes] = questionApi.useAddQuestionMutation();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const formFeildArray = useFieldArray({
    control: form.control,
    name: "object.choices",
    rules: { minLength: 3, maxLength: 5 },
  });

  const submitForm = form.handleSubmit(async (data) => {
    let cleanedData: MultiQuestion | MCQQuestion | null = null;

    if (data.object.type === "MCQ") {
      const trueChoices = data.object.choices.filter(
        (choice) => choice.isAnswer
      );
      if (trueChoices.length >= 2) {
        cleanedData = {
          type: "MULTI",
          choices: data.object.choices.map((c, id) => {
            return { ...c, id: id };
          }),
        };
      } else {
        cleanedData = {
          type: "MCQ",
          choices: data.object.choices.map((c, id) => {
            return { ...c, id: id };
          }),
        };
      }
    }
    if (cleanedData) {
      await addQuestion({
        id: Number(data.collectionId),
        data: {
          object: cleanedData,
          question: data.question,
          score: Number(data.score),
        },
      });
    } else {
      await addQuestion({
        id: Number(data.collectionId),
        data: {
          //@ts-ignore
          object: data.object,
          question: data.question,
          score: Number(data.score),
        },
      });
    }

    let error = addQuestionRes.error as PostgrestError | null;

    toast({
      title: error ? "Error" : "Success",
      description: error ? error.message : "Question Created",
    });

    if (!error) {
      form.reset();
    }
  });

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

  const QuestionTypeHandler = () => {
    const watchType = useWatch({
      name: "object.type",
      exact: true,
    });

    if (watchType === "TF") {
      return (
        <>
          <FormField
            control={form.control}
            name="object.isAnswer"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                <div className="space-y-0.5">
                  <FormDescription>
                    If Checked The answer to the Question is{" "}
                    <span className="font-medium text-primary">True</span>
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </>
      );
    }
    if (watchType === "MCQ") {
      return (
        <>
          <Card>
            <CardHeader>
              <CardTitle>
                MCQ Editor{" "}
                <Badge variant={"ghost"}>{formFeildArray.fields.length}</Badge>
              </CardTitle>
              <CardDescription>
                This panel lets you add or remove MCQ options. If you mark
                multiple choices as <Badge variant={"ghost"}>Answers</Badge>, it
                becomes a multi-answer question.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={"outline"}
                onClick={() => {
                  formFeildArray.append({ choice: "", isAnswer: false });
                }}
              >
                Append
              </Button>
              {formFeildArray.fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <h1 className="hidden">{formFeildArray.fields.length}</h1>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between w-full gap-2">
                        <FormField
                          control={form.control}
                          name={`object.choices.${index}.choice`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input className="w-full" {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          onClick={() => formFeildArray.remove(index)}
                          variant={"destructive"}
                        >
                          Delete
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        Is Answer
                        <FormField
                          control={form.control}
                          name={`object.choices.${index}.isAnswer`}
                          render={({ field }) => (
                            <FormItem className="">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </>
      );
    }
    if (watchType === "TEXT") {
      return (
        <>
          <FormField
            control={form.control}
            name="object.format"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Formate</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={"normal"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="normal">Normal Text</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="csharp">Csharp</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {/* Select{" "}
                <Link href={"/dashboard/editor/collection"}>
                  <Badge variant={"ghost"}>Collection</Badge>
                </Link>{" "}
                which you want to add Question to */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }
    return <></>;
  };

  return (
    <Form {...form}>
      <form onSubmit={submitForm} className="max-w-lg space-y-2">
        <FormField
          control={form.control}
          name="collectionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Collection" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <CollectionSelectorItems />
                </SelectContent>
              </Select>
              <FormDescription>
                Select{" "}
                <Link href={"/dashboard/editor/collection"}>
                  <Badge variant={"ghost"}>Collection</Badge>
                </Link>{" "}
                which you want to add Question to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Tabs defaultValue="edit" className="w-full py-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="prev">Preview</TabsTrigger>
          </TabsList>{" "}
          <TabsContent value="edit">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea placeholder="lol" rows={10} {...field} />
                  </FormControl>
                  <FormDescription>Question now supports MD</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent
            value="prev"
            className="p-2 border rounded-sm border-border/50"
          >
            <h1 className="text-sm font-light opacity-50">
              this is how users will see question
            </h1>
            <Separator className="my-0.5" />
            <div
              className="prose-sm"
              dangerouslySetInnerHTML={{
                __html: marked.parse(form.watch("question") ?? ""),
              }}
            />
          </TabsContent>
        </Tabs>
        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Score</FormLabel>
              <FormControl>
                <Input placeholder="Score" {...field} />
              </FormControl>

              <FormMessage />
              <FormDescription>
                The score determines the amount gained or lost based on whether
                the quiz participant's answer is correct or incorrect.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="object.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              {/*@ts-ignore */}
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"MCQ"}>MCQ</SelectItem>

                  <SelectItem value={"TF"}>TF</SelectItem>
                  <SelectItem value={"TEXT"}>TEXT</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select <Badge variant={"ghost"}>Question Type</Badge>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <QuestionTypeHandler />
        <Button variant={"ghost"} disabled={addQuestionRes.isLoading}>
          Create
        </Button>
      </form>
    </Form>
  );
}
