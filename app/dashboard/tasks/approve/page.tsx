"use client";
import GenericUserTaskApprovalList from "@/components/generics/GenericUserTaskApprovalList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QuickLoader } from "@/components/ui/loaders";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { convertTime } from "@/lib/helper/dateConverter";
import { useApproveTaskFuncMutation } from "@/lib/redux/api/tasksSupaApi";
import { useGetSingleUserQuery } from "@/lib/redux/api/usersSupaApi";
import { UserTask } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import React, { useState } from "react";

function ApproveTask() {
  const [page, setPage] = useState<number>(0);
  const [task, setTasks] = useState<UserTask | null>();
  const { toast } = useToast();
  const [approveTask, { isLoading, isError, error }] =
    useApproveTaskFuncMutation();
  const { data } = useGetSingleUserQuery(-1);

  if (!data) {
    return <div>err</div>;
  }

  return (
    <div className="flex gap-2">
      <Card className="sticky top-0 w-1/3 h-full">
        <CardHeader>
          <CardTitle>Tasks List</CardTitle>
        </CardHeader>

        <CardContent>
          <GenericUserTaskApprovalList
            defaultFinished={true}
            per={8}
            singleSelection={task?.id || null}
            onClick={(task) => {
              setTasks(task);
            }}
          />
        </CardContent>
      </Card>
      <Card className="sticky w-full h-full">
        <CardHeader>
          <CardTitle>User Task Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {task ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>User Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <h1 className="text-lg capitalize">
                    {task?.User?.firstname} {task?.User?.lastname}
                  </h1>
                  <h1 className="font-thin text-primary/70">
                    {task?.User?.email}
                  </h1>
                  <h1 className="font-thin text-primary/70">
                    {task?.User?.phonenumber}
                  </h1>
                  <h1 className="flex gap-2 text-sm font-thin capitalize text-primary/70">
                    User Score - <Badge>{task?.User?.score}</Badge>
                  </h1>
                  <Separator className="my-2" />
                  {task?.approved ? (
                    <></>
                  ) : (
                    <>
                      {task?.finished ? (
                        <div className="flex gap-2 my-2">
                          <Button
                            disabled={isLoading}
                            onClick={async () => {
                              if (task.User && task.Task) {
                                await approveTask({
                                  approverId: data.id,
                                  receiverId: task.User.id,
                                  id: task.id,
                                  points: task.Task.points,
                                  state: true,
                                });
                                if (isError) {
                                  const errorMessage = error as PostgrestError;
                                  return toast({
                                    variant: "destructive",
                                    title: "Uh oh! Something went wrong.",
                                    description: errorMessage.message,
                                  });
                                } else {
                                  setTasks(null);
                                  return toast({
                                    variant: "additive",
                                    title: `User {${task.User.firstname} ${task.User.lastname}} Task Turnin got Approved`,
                                  });
                                }
                              }
                              return toast({
                                variant: "destructive",
                                title: "Uh oh! Something went wrong.",
                              });
                            }}
                          >
                            <QuickLoader loading={isLoading} />
                            Approve
                          </Button>
                          <Button
                            disabled={isLoading}
                            onClick={async () => {
                              if (task.User && task.Task) {
                                await approveTask({
                                  approverId: data.id,
                                  receiverId: task.User.id,
                                  id: task.id,
                                  points: task.Task.points,
                                  state: false,
                                });
                                if (isError) {
                                  const errorMessage = error as PostgrestError;
                                  return toast({
                                    variant: "destructive",
                                    title: "Uh oh! Something went wrong.",
                                    description: errorMessage.message,
                                  });
                                } else {
                                  setTasks(null);
                                  return toast({
                                    variant: "additive",
                                    title: `User {${task.User.firstname} ${task.User.lastname}} Task Turnin got Denied`,
                                  });
                                }
                              }

                              return toast({
                                variant: "destructive",
                                title: "Uh oh! Something went wrong.",
                              });
                            }}
                            variant={"outline"}
                          >
                            <QuickLoader loading={isLoading} />
                            Deny
                          </Button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Task Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <h1 className="text-lg capitalize">{task?.Task?.title}</h1>
                  <h1 className="flex gap-2 text-sm font-thin capitalize text-primary/70">
                    Points - <Badge>{task?.Task?.points}</Badge>
                  </h1>
                  <div className="flex flex-col space-y-2">
                    <h1 className="flex gap-2 text-sm font-thin capitalize text-primary/70">
                      Due -{""}
                      {task?.Task ? (
                        <Badge>{convertTime(task.Task.dueDate)}</Badge>
                      ) : (
                        <></>
                      )}
                    </h1>
                    <h1 className="flex gap-2 text-sm font-thin capitalize text-primary/70">
                      Created -{""}
                      {task?.Task ? (
                        <Badge>{convertTime(task.Task.createdAt)}</Badge>
                      ) : (
                        <></>
                      )}
                    </h1>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Creator Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h1 className="text-lg capitalize">
                        {task?.Task?.User?.firstname}{" "}
                        {task?.Task?.User?.lastname}
                      </h1>
                      <h1 className="font-thin text-primary/70">
                        {task?.Task?.User?.email}
                      </h1>
                      <h1 className="font-thin text-primary/70">
                        {task?.Task?.User?.phonenumber}
                      </h1>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </>
          ) : (
            <>Select task</>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ApproveTask;
