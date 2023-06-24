"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import PermissionLister from "@/components/roles/PermissionLister";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import supaClientHandler from "@/lib/Supa/SupaClient";
const FormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "role name must be atleast 3 char",
    })
    .toLowerCase(),
  permissions: z.array(z.string()).refine((arr) => arr.length >= 1, {
    message: "permissions array must have at least one permission",
  }),
});

function CreateRole() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const supabase = supaClientHandler;
    setLoading(true);
    const { error } = await supabase.from("roles").insert({ ...data });
    if (error) {
      setLoading(false);
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
    toast({
      variant: "additive",
      title: "Hooray Role is added!!!",
    });
    setLoading(false);
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Role</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Role display name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permissions"
              render={({ field }) => (
                <FormItem>
                  <PermissionLister
                    onUpdate={(p) => {
                      form.setValue("permissions", p);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CreateRole;
