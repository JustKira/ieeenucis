"use client";
import SearchPlusFilter from "@/components/SearchPlusFilter";
import { TasksColums } from "@/components/tables/tasks/TasksColums";
import { TasksTable } from "@/components/tables/tasks/TasksTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertTime } from "@/lib/helper/dateConverter";
import useQueryParams from "@/lib/hooks/useQueryParams";
import { useGetUserTasksQuery } from "@/lib/redux/api/tasksApi";
import { useGetSingleUserQuery } from "@/lib/redux/api/usersSupaApi";
import { useDebouncedState } from "@react-hookz/web";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

function page() {
  const searchParam = useSearchParams();
  const [search, setSearch] = useDebouncedState<string | null>(null, 300, 500);

  const userData = useGetSingleUserQuery(-1);
  const [finished, setFinished] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const [pastdue, setPastdue] = useState<boolean>(false);
  const userTasksQuery = useGetUserTasksQuery({
    uid: userData.data?.uid || "",
    skip: 0,
    search: search,
    limit: 100,
    approved: approved,
    finished: finished,
    pastdue: pastdue,
  });
  return (
    <div>
      <Card className="flex flex-col w-full">
        <CardHeader>
          <div className="flex justify-start gap-2 w-fit">
            <div className="flex flex-col gap-2">
              {/* <Label>Search</Label> */}
              <Input
                placeholder="Search"
                onChange={(v) => setSearch(v.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Label>PastDue</Label>
                <Switch
                  checked={pastdue}
                  onCheckedChange={(v) => {
                    setPastdue(v);
                  }}
                />
              </div>
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
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[500px]">Title</TableHead>
                <TableHead>DueDate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Points</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userTasksQuery.data?.data.map((d, id) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{d.Task.title}</TableCell>
                  <TableCell>
                    {d.Task.dueDate ? (
                      <>{convertTime(d.Task.dueDate)}</>
                    ) : (
                      <></>
                    )}
                  </TableCell>
                  <TableCell>
                    {d.approved ? (
                      <Badge>Approved</Badge>
                    ) : (
                      <>
                        {d.finished ? (
                          <Badge>Waitting Approval</Badge>
                        ) : (
                          <Badge>Not Turned in</Badge>
                        )}
                      </>
                    )}
                  </TableCell>
                  <TableCell className="text-white">
                    {d.Task.points?.toString()}
                  </TableCell>
                  <TableCell>
                    <Link href={"/dashboard/tasks/" + d.id}>
                      <Button className="px-4" variant={"outline"}>
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        {/* <div>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex">
              <SearchPlusFilter
                searchValue={(v) => {
                  setSearch(v);
                }}
              />
            </div>
            <div className="flex flex-col gap-1 my-3">
              {userTasksQuery.data?.data.map((value, id) => (
                <Card
                  key={id}
                  className="transition-all duration-300 drop-shadow-none dark:drop-shadow-none group hover:bg-foreground/50 hover:translate-x-4"
                >
                  <CardHeader className="p-4 rounded-md ">
                    <CardTitle className="text-base font-light">
                      {value.Task.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h1> {convertTime(value.Task.dueDate || "")}</h1>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </div> */}
      </Card>
    </div>
  );
}

export default page;
