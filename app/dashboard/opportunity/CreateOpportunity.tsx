"use client";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { marked } from "marked";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCreateTaskMutation } from "@/lib/redux/api/tasksSupaApi";
import { QuickLoader } from "@/components/ui/loaders";
import { useGetSingleUserQuery } from "@/lib/redux/api/usersSupaApi";
import { PostgrestError } from "@supabase/supabase-js";
import { convertDateFormat } from "@/lib/helper/dateConverter";
import { useCreateOpportunityMutation } from "@/lib/redux/api/opportunitiesSupaApi";

const FormSchema = z.object({
  title: z.string(),
  description: z.string().min(10, {
    message: "description must be at least 10 characters.",
  }),
  deadline: z.date({
    required_error: "due date is required.",
  }),
});

function CreateOpportunity() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const {
    data: userData,
    isError: isGetUserError,
    error: getUserError,
  } = useGetSingleUserQuery(-1);
  const [createOpportunity, { isLoading, isError, error }] =
    useCreateOpportunityMutation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  React.useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (value.description) {
        setDescription(value.description);
      }
      if (value.title) {
        setTitle(value.title);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(convertDateFormat(data.deadline));

    if (isGetUserError) {
      const errorMessage = getUserError as PostgrestError;
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage.message,
      });
    }
    if (userData?.id) {
      await createOpportunity({
        opportunity: { ...data, deadline: convertDateFormat(data.deadline) },
      });
      if (isError) {
        const errorMessage = error as PostgrestError;
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMessage.message,
        });
      } else {
        return toast({
          variant: "additive",
          title: "Hooray Task has been created!!!",
        });
      }
    }
  });

  return (
    <div className="flex justify-between gap-4">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Create Opportunity</CardTitle>
          <CardDescription>
            create Opportunity you will be able to add tasks to it later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opportunity Title</FormLabel>
                    <FormControl>
                      <Input placeholder="a super hard task" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opportunity Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="..." {...field} />
                    </FormControl>
                    <FormDescription>description supports MD.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date);
                            }
                          }}
                          disabled={(date) =>
                            date < new Date() || date > new Date("2100-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Deadline for task, tasks can't be submit after deadline
                      but can be approved
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                <QuickLoader loading={isLoading} />
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            this how opportunity will look like on the other users end
          </CardDescription>
        </CardHeader>

        <CardContent>
          <h1 className="mb-4 text-4xl font-thin">{title}</h1>
          {description.length !== 0 ? (
            <div
              className="mdx"
              dangerouslySetInnerHTML={{
                __html: marked.parse(description),
              }}
            />
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateOpportunity;
