import React, { useEffect, useState } from "react";
import ListErrorLoadingWrapper from "./ListErrorLoadingWrapper";
import {
  useGetMultipleUsersQuery,
  useGetSingleUserQuery,
  useGetUserScoreHistoryQuery,
} from "@/lib/redux/api/usersSupaApi";
import Pagination from "../ui/Pagination";
import { PostgrestError } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { Opportunity, User, UserTask } from "@/types";
import { convertTime } from "@/lib/helper/dateConverter";
import { ScrollArea } from "../ui/scroll-area";
import { useGetOpportunitiesQuery } from "@/lib/redux/api/opportunitiesSupaApi";
import { User2 } from "lucide-react";

const GenericScoreHistory = ({
  onClick,
  userId,
  per,
  singleSelection,
  multipleSelection,
  multiple,
}: {
  onClick: (opportunity: Opportunity) => void;
  userId: number;
  per: number;
  singleSelection?: number | null;
  multipleSelection?: number[];
  multiple?: boolean;
}) => {
  const [page, setPage] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);
  const { data, isError, isLoading, error } = useGetUserScoreHistoryQuery({
    userId: userId,
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
        <Pagination
          per={per}
          count={data?.count || null}
          paginationTrigger={(value) => {
            setPage(value - 1);
          }}
        />
        <div className="flex flex-col space-y-4">
          {data?.list?.map((scorehistory, id) => {
            return (
              <Button
                className={`flex justify-between gap-2 h-18 w-full items-center pr-8 `}
                variant={
                  !multiple
                    ? singleSelection === scorehistory.id
                      ? "default"
                      : "outline"
                    : multipleSelection?.includes(scorehistory.id)
                    ? "default"
                    : "outline"
                }
                key={id}
                onClick={() => {}}
              >
                <div className="flex flex-col items-start justify-start space-y-1">
                  <h1 className="text-base font-medium capitalize">
                    {scorehistory.ammount > 0
                      ? `+ ${scorehistory.ammount}`
                      : `- ${scorehistory.ammount * -1}`}
                  </h1>
                  <h2 className="text-xs">{scorehistory.reason}</h2>
                  <h3 className="flex items-center gap-1 text-xs font-light opacity-50">
                    <User2 size={12} />
                    {scorehistory.User?.firstname}
                    {scorehistory.User?.lastname}
                  </h3>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </ListErrorLoadingWrapper>
  );
};

export default GenericScoreHistory;
