"use c;oemt";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { LoadWrapper } from "../ui/loaders";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useGetMultipleUsersQuery } from "@/lib/redux/api/usersSupaApi";
import { PostgrestError } from "@supabase/supabase-js";
import { Terminal } from "lucide-react";
import { User, UserRole } from "@/types";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Pagination from "../ui/Pagination";

const UserList = ({
  onClick,
  selected,
}: {
  onClick: (a: User & { UserRole: { Role: { id: number } | null }[] }) => void;
  selected?: (User & { UserRole: { Role: { id: number } | null }[] }) | null;
}) => {
  const [page, setPage] = useState<number>(0);
  const { data, isLoading, isError, error } = useGetMultipleUsersQuery({
    page: page,
    perPage: 10,
  });

  if (isError) {
    const errorMessage = error as PostgrestError;
    return (
      <Alert>
        <Terminal className="w-4 h-4" />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>{errorMessage.hint}</AlertDescription>
      </Alert>
    );
  }
  return (
    <LoadWrapper loading={isLoading}>
      <div className="flex flex-col space-y-4">
        {" "}
        <Pagination
          per={10}
          count={data?.count || null}
          paginationTrigger={(value) => {
            setPage(value - 1);
          }}
        />
        {data?.list?.map((user, id) => {
          return (
            <Button
              className={`flex justify-between gap-2 h-18 w-full items-center pr-8 `}
              variant={selected?.id === user.id ? "default" : "outline"}
              key={id}
              onClick={() => onClick(user)}
            >
              <div className="flex flex-col items-start justify-start space-y-1">
                <h1 className="text-sm font-light capitalize">
                  {user.firstname} {user.lastname}
                </h1>
                <h1 className="text-xs font-medium capitalize">{user.email}</h1>
                <h2 className="text-xs font-light capitalize text-primary/85">
                  score {user.score}
                </h2>
              </div>
            </Button>
          );
        })}
      </div>
    </LoadWrapper>
  );
};

export default UserList;
