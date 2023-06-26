"use client";
import GenericUserList from "@/components/generics/GenericUserList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { QuickLoader } from "@/components/ui/loaders";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useEditUserScoreMutation,
  useGetSingleUserQuery,
} from "@/lib/redux/api/usersSupaApi";
import { PostgrestError } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";
const FormSchema = z.object({
  reason: z.string().min(25, {
    message: "reason must be at least 25 characters.",
  }),
  ammount: z.string(),
});

function page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { toast } = useToast();
  const { data: userData } = useGetSingleUserQuery(-1);
  const [editUserScore, { isError, error, isLoading }] =
    useEditUserScoreMutation();
  const [user, setUser] = useState<User | null>(null);

  const onSubmit = form.handleSubmit(async (data) => {
    if (userData && user) {
      await editUserScore({
        ammount: Number(data.ammount),
        reason: data.reason,
        issuer: userData.id,
        receiver: user.id,
      });
      if (isError) {
        const errorMessage = error as PostgrestError;
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMessage.message,
        });
      }
      return toast({
        variant: "additive",
        title: "User Score updated successfully",
      });
    }
  });

  return (
    <div className="flex gap-4 mt-4">
      <Card className="w-1/2 flex-grow">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Select user to edit his roles</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col h-full justify-start">
          <ScrollArea className="h-full">
            <GenericUserList
              per={8}
              singleSelection={user?.id}
              onClick={(user) => {
                setUser(user);
              }}
            />
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="w-1/2 flex-grow">
        <CardHeader>
          <CardTitle>Score</CardTitle>
          <CardDescription>increase or decrease user role.</CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-6">
                <FormField
                  control={form.control}
                  name="ammount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Points</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        ammount the user will be given or taken if number is
                        negtive.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <FormControl>
                        <Textarea placeholder="..." {...field} />
                      </FormControl>
                      <FormDescription>MD isn't supported</FormDescription>
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
            <>Select User</>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
