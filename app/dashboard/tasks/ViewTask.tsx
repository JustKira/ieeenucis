import GenericUserTaskList from "@/components/generics/GenericUserTaskList";
import { UserTask } from "@/types";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { marked } from "marked";
import { convertTime } from "@/lib/helper/dateConverter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetSingleUserQuery } from "@/lib/redux/api/usersSupaApi";
import { useTaskStatusUpdateMutation } from "@/lib/redux/api/tasksSupaApi";
import { useToast } from "@/components/ui/use-toast";
import { PostgrestError } from "@supabase/supabase-js";
import { QuickLoader } from "@/components/ui/loaders";

function ViewTask() {
  const { data, isLoading } = useGetSingleUserQuery(-1);
  const { toast } = useToast();
  const [
    updateTaskStatus,
    { isLoading: updateTaskIsloading, isError: updateTaskIsError, error },
  ] = useTaskStatusUpdateMutation();
  const [task, setTasks] = useState<Omit<UserTask, "User"> | null>();

  const UpdateTask = (status: boolean, taskId: number) => {
    updateTaskStatus({ status: status, taskId: taskId });
    if (updateTaskIsError) {
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
        title: "Task has been Updated",
      });
    }
  };

  if (!data) {
    return <>Error</>;
  }

  return (
    <div className="flex justify-between flex-grow w-full gap-2">
      <Card className="sticky top-0 w-1/4 h-fit">
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>

        <CardContent>
          <GenericUserTaskList
            per={8}
            singleSelection={task?.id || null}
            onClick={(task) => {
              setTasks(task);
            }}
          />
        </CardContent>
      </Card>

      <Card className="relative w-3/4 border-0">
        <CardHeader>
          <CardTitle className="flex flex-col text-sm font-medium capitalize ">
            {task?.Task?.title}
          </CardTitle>
          <CardDescription>
            {task?.Task?.dueDate ? (
              <> {convertTime(task?.Task?.dueDate)}</>
            ) : (
              <></>
            )}
          </CardDescription>
        </CardHeader>

        {task?.Task ? (
          <CardContent>
            {task?.Task?.description ? (
              <div
                className="mdx"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(task.Task.description),
                }}
              />
            ) : (
              <></>
            )}

            <div className="">
              {task?.approved ? (
                <>Task has been Approved</>
              ) : task?.finished ? (
                <Button
                  onClick={() => {
                    UpdateTask(false, task.id);
                  }}
                  disabled={updateTaskIsloading}
                >
                  <QuickLoader loading={updateTaskIsloading} />
                  Undo Turn In
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    UpdateTask(true, task.id);
                  }}
                  disabled={updateTaskIsloading}
                >
                  <QuickLoader loading={updateTaskIsloading} />
                  Turn In
                </Button>
              )}
            </div>
          </CardContent>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}

export default ViewTask;
