"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { quizApi } from "@/lib/redux/api/quizApi";
import { useToast } from "@/components/ui/use-toast";
import { PostgrestError } from "@supabase/supabase-js";

const formSchema = z.object({
  code: z.string(),
});

export default function QuizCodeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [assignQuiz, assignQuizRes] = quizApi.useAssignQuizScheduleMutation();
  const { toast } = useToast();
  const submitForm = form.handleSubmit(async (data) => {
    await assignQuiz(data.code);

    let error = assignQuizRes.error as PostgrestError | null;
    toast({
      title: error ? "Error" : "Success",
      description: error ? error.message : "Question Added",
    });
  });
  return (
    <Form {...form}>
      <form onSubmit={submitForm} className="max-w-lg space-y-2">
        <div className="flex items-end gap-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="xxxxxxxx" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"ghost"}>Submit</Button>
        </div>
      </form>
    </Form>
  );
}
