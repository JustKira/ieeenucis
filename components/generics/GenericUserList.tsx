import React, { useEffect, useState } from "react";
import ListErrorLoadingWrapper from "./ListErrorLoadingWrapper";
import { useGetMultipleUsersQuery } from "@/lib/redux/api/usersSupaApi";
import Pagination from "../ui/Pagination";
import { PostgrestError } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { User } from "@/types";

const GenericUserList = ({
  onClick,
  per,
  singleSelection,
  multipleSelection,
  multiple,
}: {
  onClick: (user: User) => void;
  per: number;
  singleSelection?: number | null;
  multipleSelection?: number[];
  multiple?: boolean;
}) => {
  const [page, setPage] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);
  const { data, isError, isLoading, error } = useGetMultipleUsersQuery({
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
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex flex-col space-y-4">
          {data?.list?.map((user, id) => {
            return (
              <Button
                className={`flex justify-between gap-2 h-18 w-full items-center pr-8 `}
                variant={
                  !multiple
                    ? singleSelection === user.id
                      ? "default"
                      : "outline"
                    : multipleSelection?.includes(user.id)
                    ? "default"
                    : "outline"
                }
                key={id}
                onClick={() => {
                  onClick(user);
                }}
              >
                <div className="flex flex-col justify-start items-start space-y-1">
                  <h1 className="text-base capitalize font-bold">
                    {user.firstname}
                  </h1>
                  <h1 className="text-xs capitalize font-light">
                    {user.email}
                  </h1>
                  <h2 className="text-xs font-light capitalize">
                    score {user.score}
                  </h2>
                </div>
              </Button>
            );
          })}
        </div>
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

export default GenericUserList;
