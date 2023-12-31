import React, { useEffect, useState } from "react";
import ListErrorLoadingWrapper from "./ListErrorLoadingWrapper";
import {
  useGetMultipleUsersQuery,
  useGetSingleUserQuery,
} from "@/lib/redux/api/usersSupaApi";
import Pagination from "../ui/Pagination";
import { PostgrestError } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { OpportunityRequest, User, UserTask } from "@/types";
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
import { useGetOpportunitiesRequestsQuery } from "@/lib/redux/api/opportunitiesSupaApi";
import { Separator } from "../ui/separator";

const GenericOpportunitiesApprovalList = ({
  onClick,
  per,
  singleSelection,
  multipleSelection,
  defaultFinished,
  defaultApproved,
  multiple,
}: {
  onClick: (user: OpportunityRequest) => void;
  per: number;
  defaultFinished?: boolean;
  defaultApproved?: boolean;
  singleSelection?: number | null;
  multipleSelection?: number[];
  multiple?: boolean;
}) => {
  const [page, setPage] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const { data, isError, isLoading, error } = useGetOpportunitiesRequestsQuery({
    page: page,
    perPage: per,
    approved: approved,
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
                <Label>Approved</Label>
                <Switch
                  checked={approved}
                  onCheckedChange={(v) => {
                    setApproved(v);
                  }}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Pagination
          per={per}
          count={data?.count || null}
          paginationTrigger={(value) => {
            setPage(value - 1);
          }}
        />
        <div className="flex flex-col space-y-4">
          {data?.list?.map((opportunityRequest, id) => {
            return (
              <Button
                className={`flex justify-between gap-2 h-18 w-full items-center pr-8 `}
                variant={
                  !multiple
                    ? singleSelection === opportunityRequest.id
                      ? "default"
                      : "outline"
                    : multipleSelection?.includes(opportunityRequest.id)
                    ? "default"
                    : "outline"
                }
                key={id}
                onClick={() => {
                  onClick(opportunityRequest);
                }}
              >
                <div className="flex flex-col items-start justify-start space-y-1">
                  <h1 className="text-base font-medium capitalize">
                    {opportunityRequest.User?.firstname}
                    {opportunityRequest.User?.lastname}
                  </h1>
                  <h1 className="text-sm font-light capitalize text-start">
                    {opportunityRequest.Opportunity?.title}
                  </h1>
                  <Separator className="opacity-50" />
                  <h2 className="text-xs">
                    {convertTime(
                      opportunityRequest.Opportunity?.deadline || ""
                    )}
                  </h2>
                  <h1 className="text-xs font-light mt-0.5">
                    {opportunityRequest.approved ? (
                      <>Approved</>
                    ) : (
                      <>Waitting Approval</>
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

export default GenericOpportunitiesApprovalList;
