"use client";
import React, { useEffect, useState } from "react";
import ListErrorLoadingWrapper from "./ListErrorLoadingWrapper";
import { useGetRolesQuery } from "@/lib/redux/api/rolesSupaApi";
import Pagination from "../ui/Pagination";
import { PostgrestError } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { Role } from "@/types";

const GenericRoleList = ({
  onClick,
  per,
  singleSelection,
  multipleSelection,
  multiple,
}: {
  onClick: (role: Role) => void;
  per: number;
  singleSelection?: number | null;
  multipleSelection?: number[];
  multiple?: boolean;
}) => {
  const [page, setPage] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);
  const { data, isError, isLoading, error } = useGetRolesQuery({
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
          {data?.list?.map((role, id) => {
            return (
              <Button
                className={`flex justify-between gap-2 h-18 w-full items-center pr-8 `}
                variant={
                  !multiple
                    ? singleSelection === role.id
                      ? "default"
                      : "outline"
                    : multipleSelection?.includes(role.id)
                    ? "default"
                    : "outline"
                }
                key={id}
                onClick={() => {
                  onClick(role);
                }}
              >
                <div className="flex flex-col justify-start items-start space-y-1">
                  <h1 className="text-base capitalize font-bold">
                    {role.name}
                  </h1>
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

export default GenericRoleList;
