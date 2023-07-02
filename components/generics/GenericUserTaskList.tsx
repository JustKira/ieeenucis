import React, { useEffect, useState } from "react";
import ListErrorLoadingWrapper from "./ListErrorLoadingWrapper";
import {
  useGetMultipleUsersQuery,
  useGetSingleUserQuery,
} from "@/lib/redux/api/usersSupaApi";
import Pagination from "../ui/Pagination";
import { PostgrestError } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { User, UserTask } from "@/types";
import { useGetUsertasksQuery } from "@/lib/redux/api/tasksSupaApi";
import { convertTime } from "@/lib/helper/dateConverter";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";

const GenericUserTaskList = ({
  onClick,
  per,
  singleSelection,
  multipleSelection,
  multiple,
}: {
  onClick: (user: Omit<UserTask, "User">) => void;
  per: number;
  singleSelection?: number | null;
  multipleSelection?: number[];
  multiple?: boolean;
}) => {
  const [page, setPage] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);
  const { data: userData } = useGetSingleUserQuery(-1);
  const { data, isError, isLoading, error } = useGetUsertasksQuery(
    {
      userId: userData?.id || -1,
      page: page,
      perPage: per,
    },
    { skip: userData?.id === undefined }
  );

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
        <Pagination
          per={per}
          count={data?.count || null}
          paginationTrigger={(value) => {
            setPage(value - 1);
          }}
        />
        <div className="flex flex-col space-y-4">
          {data?.list?.map((utask, id) => {
            return (
              <Button
                className={`flex justify-between gap-2 h-18 w-full items-center pr-8 `}
                variant={
                  !multiple
                    ? singleSelection === utask.id
                      ? "default"
                      : "outline"
                    : multipleSelection?.includes(utask.id)
                    ? "default"
                    : "outline"
                }
                key={id}
                onClick={() => {
                  onClick(utask);
                }}
              >
                <div className="flex flex-col items-start justify-start space-y-2">
                  <h1 className="flex flex-col text-base font-medium capitalize text-start">
                    {utask.Task?.title}
                    <span className="text-xs font-light">
                      Points Gained {utask?.Task?.points}
                    </span>
                  </h1>

                  <h2 className="text-xs font-light">
                    {convertTime(utask.Task?.dueDate || "")}
                  </h2>
                  <h1>Points Gain{utask.Task?.points}</h1>
                  <h1 className="text-xs font-light mt-0.5">
                    {utask.approved ? (
                      <>Approved</>
                    ) : (
                      <>{utask.finished ? <>Turned In</> : <></>}</>
                    )}
                  </h1>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </ListErrorLoadingWrapper>
  );
};

export default GenericUserTaskList;
