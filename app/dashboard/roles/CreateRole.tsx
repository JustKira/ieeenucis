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
import { useCreateRoleMutation } from "@/lib/redux/api/rolesSupaApi";
import { PostgrestError } from "@supabase/supabase-js";
import { QuickLoader } from "@/components/ui/loaders";
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
  const [createRole, { isLoading, isError, error }] = useCreateRoleMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    createRole(data);
    if (isError) {
      const errorMessage = error as PostgrestError;
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage.message,
      });
    }
    toast({
      variant: "additive",
      title: "Hooray Role is added!!!",
    });
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
            <Button type="submit" disabled={isLoading}>
              <QuickLoader loading={isLoading} />
              Create
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CreateRole;
