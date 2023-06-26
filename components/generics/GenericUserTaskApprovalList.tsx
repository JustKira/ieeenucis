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
import {
  useGetAllUsertasksQuery,
  useGetUsertasksQuery,
} from "@/lib/redux/api/tasksSupaApi";
import { convertTime } from "@/lib/helper/dateConverter";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const GenericUserTaskApprovalList = ({
  onClick,
  per,
  singleSelection,
  multipleSelection,
  multiple,
}: {
  onClick: (user: UserTask) => void;
  per: number;
  singleSelection?: number | null;
  multipleSelection?: number[];
  multiple?: boolean;
}) => {
  const [page, setPage] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const { data, isError, isLoading, error } = useGetAllUsertasksQuery({
    page: page,
    perPage: per,
    approved: approved,
    finished: finished,
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Filters</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tasks Status Filter</DialogTitle>
              <DialogDescription>
                You can get different tasks by turning the switch on and off.
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Label>Finished</Label>
                <Switch
                  checked={finished}
                  onCheckedChange={(v) => {
                    setFinished(v);
                    if (approved === true && v === false) {
                      setApproved(false);
                    }
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Label>Approved</Label>
                <Switch
                  checked={approved}
                  onCheckedChange={(v) => {
                    setApproved(v);
                    if (finished === false && v === true) {
                      setFinished(true);
                    }
                  }}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <ScrollArea className="h-[58vh]">
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
                  <div className="flex flex-col items-start justify-start space-y-1">
                    <h1 className="text-base font-medium capitalize">
                      {utask.Task?.title}
                    </h1>
                    <h2 className="text-xs">
                      {convertTime(utask.Task?.dueDate || "")}
                    </h2>
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
        </ScrollArea>
        <Pagination
          per={per}
          count={data?.count || null}
          paginationTrigger={(value) => {
            setPage(value - 1);
          }}
        />
      </div>
    </ListErrorLoadingWrapper>
  );
};

export default GenericUserTaskApprovalList;
