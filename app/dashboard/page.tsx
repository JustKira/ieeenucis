"use client";
import GenericScoreHistory from "@/components/generics/GenericScoreHistory";
import GenericUserTaskList from "@/components/generics/GenericUserTaskList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Calendar from "@/components/Calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetSingleUserQuery } from "@/lib/redux/api/usersSupaApi";
import { PostgrestError } from "@supabase/supabase-js";
import { Eye, Terminal } from "lucide-react";
import Link from "next/link";
import React from "react";

function DashboardHomePage() {
  const { data, isLoading, isError, error } = useGetSingleUserQuery(-1);
  if (isLoading) {
    return <div>LOAD..</div>;
  }
  if (!data?.id && !isLoading) {
    return (
      <Alert>
        <Terminal className="w-4 h-4" />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>Error while fetching User</AlertDescription>
      </Alert>
    );
  }
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
  const Profile = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex gap-2">
              <h1 className="flex gap-1 font-medium">
                {data?.firstname} {data?.lastname}
              </h1>
              <h1 className="flex gap-1 font-light">{data?.score}</h1>
            </div>
          </CardTitle>
          <CardDescription>
            <div className="flex flex-col">
              <h1>{data?.email}</h1>
              <h1>{data?.phonenumber}</h1>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col py-4 pr-2 space-y-6">
      <Calendar />
      <div className="flex gap-4">
        <div className="flex flex-col w-3/4 space-y-2">
          <Profile />
          <Card>
            <CardHeader>
              <CardTitle>Score History</CardTitle>
              <CardDescription>
                note any score changes that occurred.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GenericScoreHistory
                per={8}
                userId={data?.id || -1}
                onClick={() => {}}
              />
            </CardContent>
          </Card>
        </div>

        <Card className="w-1/4">
          <CardHeader>
            <CardTitle>
              <Link href={"/dashboard/tasks"} className="flex gap-2">
                <Eye className="animate-pulse" />
                Tasks
              </Link>
            </CardTitle>
            <CardDescription>current tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <GenericUserTaskList per={8} onClick={() => {}} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardHomePage;
