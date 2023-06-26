import React, { useEffect, useState } from "react";
import ListErrorLoadingWrapper from "./ListErrorLoadingWrapper";
import {
  useGetMultipleUsersQuery,
  useGetSingleUserQuery,
} from "@/lib/redux/api/usersSupaApi";
import Pagination from "../ui/Pagination";
import { PostgrestError } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { Opportunity, User, UserTask } from "@/types";
import { convertTime } from "@/lib/helper/dateConverter";
import { ScrollArea } from "../ui/scroll-area";
import { useGetOpportunitiesQuery } from "@/lib/redux/api/opportunitiesSupaApi";

const GenericOpportunitiesList = ({
  onClick,
  per,
  singleSelection,
  multipleSelection,
  multiple,
}: {
  onClick: (opportunity: Opportunity) => void;
  per: number;
  singleSelection?: number | null;
  multipleSelection?: number[];
  multiple?: boolean;
}) => {
  const [page, setPage] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);

  const { data, isError, isLoading, error } = useGetOpportunitiesQuery({
    page: page,
    perPage: per,
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
        <ScrollArea className="h-[58vh]">
          <div className="flex flex-col space-y-4">
            {data?.list?.map((opportunity, id) => {
              return (
                <Button
                  className={`flex justify-between gap-2 h-18 w-full items-center pr-8 `}
                  variant={
                    !multiple
                      ? singleSelection === opportunity.id
                        ? "default"
                        : "outline"
                      : multipleSelection?.includes(opportunity.id)
                      ? "default"
                      : "outline"
                  }
                  key={id}
                  onClick={() => {
                    onClick(opportunity);
                  }}
                >
                  <div className="flex flex-col items-start justify-start space-y-1">
                    <h1 className="text-base font-medium capitalize">
                      {opportunity.title}
                    </h1>
                    <h2 className="text-xs">
                      {convertTime(opportunity.deadline || "")}
                    </h2>
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

export default GenericOpportunitiesList;
