"use client";
import { format } from "date-fns";
import GenericRoleList from "@/components/generics/GenericRoleList";
import GenericUserList from "@/components/generics/GenericUserList";
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
import { User } from "@/types";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "@/lib/redux/api/tasksSupaApi";
import { QuickLoader } from "@/components/ui/loaders";
import { useGetSingleUserQuery } from "@/lib/redux/api/usersSupaApi";
import { PostgrestError } from "@supabase/supabase-js";
import { convertDateFormat } from "@/lib/helper/dateConverter";
import GenericTaskList from "@/components/generics/GenericTaskList";
function parseDateStringToDate(dateString: string): Date {
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);
  const dateObject = new Date(year, month - 1, day, hour, minute, second);

  return dateObject;
}

const FormSchema = z.object({
  title: z.string().optional(),
  description: z
    .string()
    .min(10, {
      message: "description must be at least 10 characters.",
    })
    .optional(),
  points: z.string().optional(),
  dueDate: z.date().optional(),
});
function UpdateTask() {
  const [task, setTask] = useState<number | null>(null);

  const [title, setTitle] = useState<string>("");
  const {
    data: userData,
    isError: isGetUserError,
    error: getUserError,
  } = useGetSingleUserQuery(-1);
  const [updateTask, { isLoading, isError, error }] = useUpdateTaskMutation();
  const { toast } = useToast();
  const [description, setDescription] = useState<string>("");
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
    if (isGetUserError) {
      const errorMessage = getUserError as PostgrestError;
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage.message,
      });
    }
    if (task) {
      const updatedTaskData = {
        ...data,
        points: Number(data.points),
        dueDate: data.dueDate ? data.dueDate.toISOString() : undefined,
      };

      await updateTask({
        updatedTask: updatedTaskData,
        taskId: task,
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
          title: "Hooray Task has been updated!!!",
        });
      }
    }
  });

  return (
    <div className="flex justify-between gap-4">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Update Task</CardTitle>

          <CardDescription>
            <Dialog>
              <DialogTrigger>
                <Button type="button" variant={"ghost"}>
                  Select Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Task</DialogTitle>
                  <DialogDescription>Choose Task to Update</DialogDescription>
                </DialogHeader>
                <div>
                  <GenericTaskList
                    per={5}
                    singleSelection={task}
                    onClick={(task) => {
                      form.setValue(
                        "dueDate",
                        parseDateStringToDate(task.dueDate)
                      );
                      form.setValue("points", task.points.toString());
                      form.setValue("title", task.title);
                      form.setValue("description", task.description);
                      setTask(task.id);
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>
            {/* add a new task note choose at least a single user or a single role.. */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {task ? (
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Title</FormLabel>
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
                      <FormLabel>Task Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        description supports MD.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="points"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Points</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Users who finish tasks and get task administrator
                        approval will receive points.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>DueDate</FormLabel>
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
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            this how task will look like on the other users end
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

export default UpdateTask;
