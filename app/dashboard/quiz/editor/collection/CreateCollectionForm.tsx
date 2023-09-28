"use client";
import { Button } from "@/components/ui/button";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { collectionApi } from "@/lib/redux/api/collectionApi";
import { useToast } from "@/components/ui/use-toast";
import { PostgrestError } from "@supabase/supabase-js";

const formSchema = z.object({
  collectionName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function CreateCollectionForm() {
  const [createCollection, createCollectionRes] =
    collectionApi.useCreateCollectionMutation();

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (d) => {
          await createCollection(d);

          if (createCollectionRes.isError) {
            const error = createCollectionRes.error as PostgrestError;
            toast({ title: "Error", description: error.message });
          } else {
            toast({ title: "Success", description: "Collection Created" });
          }
        })}
        className="space-y-2 w-fit"
      >
        <FormField
          control={form.control}
          name="collectionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Name</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                This is name of collection which will store all Questions
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createCollectionRes.isLoading}>
          Add
        </Button>
      </form>
    </Form>
  );
}
