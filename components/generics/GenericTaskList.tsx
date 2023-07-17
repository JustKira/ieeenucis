import React, { useEffect, useState } from "react";
import ListErrorLoadingWrapper from "./ListErrorLoadingWrapper";
import {
  useGetMultipleUsersQuery,
  useGetSingleUserQuery,
} from "@/lib/redux/api/usersSupaApi";
import Pagination from "../ui/Pagination";
import { PostgrestError } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { Task, UserTask } from "@/types";
import {
  useGetTasksQuery,
  useGetUsertasksQuery,
} from "@/lib/redux/api/tasksSupaApi";
import { convertTime } from "@/lib/helper/dateConverter";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useDebouncedState } from "@react-hookz/web";
import TaskToWho from "./TaskToWho";
const GenericTaskList = ({
  onClick,
  per,
  singleSelection,
  multipleSelection,
  multiple,
}: {
  onClick: (task: Task) => void;
  per: number;
  singleSelection?: number | null;
  multipleSelection?: number[];
  multiple?: boolean;
}) => {
  const [page, setPage] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);

  const [search, setSearch] = useDebouncedState<string | null>(null, 500, 1000);
  const { data, isError, isLoading, error } = useGetTasksQuery({
    page: page,
    perPage: per,
    search: search ? search : null,
  });

  useEffect(() => {
    setTrigger(!trigger);
  }, [singleSelection, multipleSelection]);

  return (
    <ListErrorLoadingWrapper
      isError={isError}
      isLoading={isLoading}
      error={error as PostgrestError}
    >
      <div className="flex flex-col flex-grow gap-4">
        <Label>Search</Label>
        <Input onChange={(e) => setSearch(e.target.value)} />
        <Pagination
          per={per}
          count={data?.count || null}
          paginationTrigger={(value) => {
            setPage(value - 1);
          }}
        />
        <div className="flex flex-col space-y-4">
          {data?.list?.map((task, id) => {
            return (
              <Button
                className={`group flex justify-between gap-2 h-18 w-full items-center pr-8 `}
                variant={
                  !multiple
                    ? singleSelection === task.id
                      ? "default"
                      : "outline"
                    : multipleSelection?.includes(task.id)
                    ? "default"
                    : "outline"
                }
                key={id}
                onClick={() => {
                  onClick(task);
                }}
              >
                <div className="flex flex-col items-start justify-start space-y-2">
                  <h1 className="flex flex-col text-base font-medium capitalize text-start">
                    {task.title}
                    <span className="text-xs font-light">
                      Points Gained {task?.points}
                    </span>
                  </h1>

                  <h2 className="text-xs font-extralight">
                    {convertTime(task.dueDate || "")}
                  </h2>
                  <h1>Points Gain{task.points}</h1>

                  <div className="flex h-full gap-1 text-xs font-light">
                    <TaskToWho taskId={task.id} />
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </ListErrorLoadingWrapper>
  );
};

export default GenericTaskList;
