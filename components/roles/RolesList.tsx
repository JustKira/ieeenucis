"use client";
import { useGetRolesQuery } from "@/lib/redux/api/rolesSupaApi";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import { PostgrestError } from "@supabase/supabase-js";
import { LoadWrapper } from "../ui/loaders";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Role } from "@/types";

function RolesList({
  onClick,
  selectedId,
}: {
  onClick: (a: Role) => void;
  selectedId?: number | null;
}) {
  const { data, isLoading, isError, error } = useGetRolesQuery({
    page: 0,
    perPage: 30,
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
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>Roles</CardTitle>
      </CardHeader>
      <CardContent>
        <LoadWrapper loading={isLoading}>
          <ScrollArea>
            <div className="flex flex-col space-y-4">
              {data?.list?.map((role, id) => {
                return (
                  <Button
                    className="items-start justify-start capitalize"
                    variant={selectedId === role.id ? "secondary" : "outline"}
                    onClick={() => {
                      onClick(role);
                    }}
                    key={id}
                  >
                    {role.name}
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </LoadWrapper>
      </CardContent>
    </Card>
  );
}

export default RolesList;
