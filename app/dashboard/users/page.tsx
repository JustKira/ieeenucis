"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserList from "@/components/users/UserList";
import UserRoleList from "@/components/users/UserRoleList";
import { User } from "@/types";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserRoleMutation } from "@/lib/redux/api/usersSupaApi";
import { PostgrestError } from "@supabase/supabase-js";
import { QuickLoader } from "@/components/ui/loaders";

function extractIds(
  userRoles: { Role: { id: number } | null }[] | undefined
): number[] {
  if (!userRoles) {
    return [];
  }

  return userRoles
    .map((userRole) => userRole.Role?.id)
    .filter((id) => id !== null) as number[];
}

function UserRolePage() {
  const [selected, setSelected] = useState<
    (User & { UserRole: { Role: { id: number } | null }[] }) | null
  >(null);
  const [getAdded, setGetAdded] = useState<number[]>([]);
  const [getRemoved, setGetRemoved] = useState<number[]>([]);
  const { toast } = useToast();

  const [createUserRole, { isLoading, isError, error }] =
    useCreateUserRoleMutation();

  const CreateUserRoleHandler = async () => {
    console.log(extractIds(selected?.UserRole));

    if (selected === null || !selected.id) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "please before edit select a user",
      });
    }
    if (getAdded.length === 0 && getRemoved.length === 0) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "nothing to update. please add or remove roles from selected user to apply the changes.",
      });
    }

    await createUserRole({
      userId: selected.id,
      addRoleIds: getAdded,
      removeRoleIds: getRemoved,
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
      title: "Updates are successfully applied",
      description: `User ${selected.firstname} ${selected.lastname} Roles are updated`,
    });
  };

  return (
    <Card className="flex flex-col h-full flex-grow border-0">
      <CardHeader>
        <CardTitle>Users Role</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow justify-between items-stretch space-x-2">
        <Card className="w-full flex-grow">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Select user to edit his roles</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea>
              <UserList
                onClick={(u) => {
                  setSelected(u);
                }}
                selected={selected}
              />
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="w-full  flex-grow">
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>Roles</CardTitle>
              <CardDescription>
                Check Roles that you want to add or remove from user
              </CardDescription>
            </div>
            <Button
              type="button"
              className="px-8"
              onClick={() => {
                CreateUserRoleHandler();
              }}
              disabled={isLoading}
            >
              <QuickLoader loading={isLoading} />
              Apply
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col h-full justify-start">
            <ScrollArea className="h-full">
              <UserRoleList
                onUpdate={(added, removed) => {
                  setGetAdded(added);
                  setGetRemoved(removed);
                }}
                selected={selected?.id}
                loadValues={extractIds(selected?.UserRole)}
              />
            </ScrollArea>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default UserRolePage;
