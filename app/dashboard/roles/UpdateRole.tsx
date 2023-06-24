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
import { useUpdateRoleMutation } from "@/lib/redux/api/rolesSupaApi";
import { PostgrestError } from "@supabase/supabase-js";
import { QuickLoader } from "@/components/ui/loaders";
import RolesList from "@/components/roles/RolesList";
import { Role } from "@/types";
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

function UpdateRole() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<Role | null>();
  const [updateRole, { isLoading, isError, error, isSuccess }] =
    useUpdateRoleMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (!selected) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please Select Role to Edit",
      });
    }

    updateRole({ roleId: selected.id, role: { ...data } });

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
      title: `Role {${selected.name}} as been Updated`,
    });
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Role</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between space-x-2">
        <Form {...form}>
          <form onSubmit={onSubmit} className="w-full space-y-4">
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
                    loadvalues={selected?.permissions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              <QuickLoader loading={isLoading} /> Update
            </Button>
          </form>
        </Form>

        <RolesList
          onClick={(r) => {
            setSelected(r);
            form.setValue("name", r.name);
          }}
          selectedId={selected?.id}
        />
      </CardContent>
    </Card>
  );
}

export default UpdateRole;
