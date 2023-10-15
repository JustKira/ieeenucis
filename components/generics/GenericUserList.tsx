import React, { useEffect, useState } from "react";
import ListErrorLoadingWrapper from "./ListErrorLoadingWrapper";
import { useGetMultipleUsersQuery } from "@/lib/redux/api/usersSupaApi";
import Pagination from "../ui/Pagination";
import { PostgrestError } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { User } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Icon } from "@iconify/react";

const GenericUserList = ({
  onClick,
  per,
  singleSelection,
  multipleSelection,
  multiple,
  search,
}: {
  onClick: (user: User) => void;
  per: number;
  singleSelection?: number | null;
  multipleSelection?: number[];
  multiple?: boolean;
  search?: boolean;
}) => {
  const [page, setPage] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);

  const [searchText, setSeachText] = useState<string | null>(null);
  const { data, isError, isLoading, error } = useGetMultipleUsersQuery({
    page: page,
    perPage: per,
    textSearch: searchText,
  });

  useEffect(() => {
    setTrigger(!trigger);
  }, [singleSelection, multipleSelection]);

  useEffect(() => {
    setPage(0);
  }, [searchText]);
  return (
    <ListErrorLoadingWrapper
      isError={isError}
      isLoading={isLoading}
      error={error as PostgrestError}
    >
      {search ? (
        <div className="py-4">
          <Label>Search</Label>
          <div className="flex items-center justify-center gap-2">
            <Input
              value={searchText ?? ""}
              onChange={(e) => {
                if (e.target.value) {
                  if (e.target.value.includes(" ")) {
                    // If there are spaces in e.target.value, return without updating searchText.
                    return;
                  }
                  // If there are no spaces, update searchText.
                  setSeachText(e.target.value);
                }
              }}
            />
            <Button onClick={() => setSeachText(null)}>Reset</Button>
          </div>
          <h1 className="py-1 text-xs font-light capitalize opacity-50">
            only firstname dont use Spaces wont work, note its not a smart
            search you need to type firstname fully or it won't work
          </h1>
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col flex-grow gap-4">
        <Pagination
          per={per}
          count={data?.count || null}
          paginationTrigger={(value) => {
            setPage(value - 1);
          }}
        />
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
                <div className="flex flex-col items-start justify-start space-y-1">
                  <h1 className="text-base font-bold capitalize">
                    <span className="flex items-center gap-2 text-sm font-light text-primary">
                      ID {user.id}
                    </span>{" "}
                    {user.firstname} {user.lastname}
                  </h1>
                  <h1 className="text-xs font-light capitalize">
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
      </div>
    </ListErrorLoadingWrapper>
  );
};

export default GenericUserList;
