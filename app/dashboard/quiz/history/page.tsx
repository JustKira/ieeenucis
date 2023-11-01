"use client";
import { Database } from "@/lib/database";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { QuizSchedule, User } from "@/types";
import { User2 } from "lucide-react";
import { format } from "date-fns";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { quizApi } from "@/lib/redux/api/quizApi";

import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { QuickLoader } from "@/components/ui/loaders";

function page() {
  const supabase = createClientComponentClient<Database>();
  const [getQuizScores, getQuizScoresRes] = quizApi.useLazyGetQuizScoresQuery();
  const [schedules, setSchedules] = useState<
    | {
        code: string;
        duration: number;
        id: number;
        name: string;
        quizId: number;
        startDate: string;
      }[]
    | null
  >([]);
  const [open, setOpen] = React.useState(false);

  const [recal, recalRes] = quizApi.useRecalQuizMutation();
  const [recalFor, setRecalFor] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>();
  const [userQuiz, setUserQuiz] = useState<
    | {
        attended: boolean;
        attendedAt: string | null;
        autoGrade: number;
        id: number;
        manualGrade: number;
        quizId: number;
        quizScheduleId: number;
        submitted: boolean;
        userId: number;
        QuizSchedule: QuizSchedule | null;
      }[]
    | null
  >([]);
  const [users, setUsers] = useState<User[]>([]);
  async function getUserQuiz(id: number) {
    const { data } = await supabase
      .schema("quizzy")
      .from("UserQuiz")
      .select("*,QuizSchedule(*,Quiz(*))")
      .eq("quizScheduleId", id);

    if (data) {
      console.log(data);
      const allIds = data.map((d) => d.userId);
      const { data: users } = await supabase
        .schema("public")
        .from("User")
        .select("*")
        .in("id", allIds);
      if (users) {
        setUsers(users);
        setUserQuiz(data);
      }
    }
  }

  async function getUserSchema() {
    const { data } = await supabase
      .schema("quizzy")
      .from("QuizSchedule")
      .select();

    if (data) {
      setSchedules(data);
    }
  }

  useEffect(() => {
    getUserSchema();
  }, []);

  useEffect(() => {
    if (selected) getQuizScores(selected);
  }, [selected]);

  return (
    <>
      {" "}
      <CardHeader>
        <CardTitle>History</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {selected
                    ? schedules?.find((framework) => framework.id === selected)
                        ?.name
                    : "Select Quiz..."}
                  <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Quiz..." className="h-9" />
                  <CommandEmpty>No Quiz found.</CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-auto">
                    {schedules?.map((framework) => (
                      <CommandItem
                        key={framework.id}
                        onSelect={() => {
                          setSelected(
                            framework.id === selected ? -1 : framework.id
                          );
                          setOpen(false);
                        }}
                      >
                        {framework.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selected === framework.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {/* <Select onValueChange={(v) => setSelected(Number(v))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Quiz Schedule" />
              </SelectTrigger>
              <SelectContent>
                {schedules?.map((s) => (
                  <SelectItem value={s.id.toString()}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select> */}

            <div className="flex flex-col gap-2 py-2">
              {getQuizScoresRes.data?.data.map((d) => {
                return (
                  <Card className="flex items-center justify-between gap-4 px-4 py-2">
                    <div className="flex gap-4 px-4 py-2">
                      <h1>QID {d.id}</h1>
                      <User2 className="w-4" />
                      <div className="flex gap-2">
                        <h2 className="w-20 font-light">
                          {" "}
                          {d.autoGrade}
                          {"  /"}
                          {d.QuizSchedule?.Quiz?.totalMarks}
                        </h2>
                        <div className="flex gap-4 font-medium capitalize">
                          <h1>
                            {d.User?.firstname} {d.User?.lastname}
                          </h1>
                          <h1 className="text-xs font-light">
                            {d.attendedAt ? (
                              <> {format(new Date(d.attendedAt), "ppp")}</>
                            ) : (
                              <>Didn't attend</>
                            )}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        disabled={
                          !d.attendedAt ||
                          (recalRes.isLoading && d.userId === recalFor)
                        }
                        variant={"outline"}
                        onClick={() => {
                          setRecalFor(d.userId);
                          recal(d.id);
                        }}
                      >
                        Recalculate{" "}
                        <QuickLoader
                          loading={recalRes.isLoading && d.userId === recalFor}
                        />
                      </Button>
                      {/* <Dialog>
                        <DialogTrigger>
                          <Button disabled={!d.attendedAt} variant={"outline"}>
                            Quiz JSON
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>Raw Quiz Answers</DialogHeader>
                          <pre>{JSON.stringify(d.answers, null, "\t")}</pre>
                        </DialogContent>
                      </Dialog> */}
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            disabled={!d.attendedAt}
                            variant={"destructive"}
                          >
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>Control User Quiz</DialogHeader>
                          <Button variant={"destructive"}>
                            Reset Attendance{" "}
                            <QuickLoader loading={recalRes.isLoading} />
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </>
  );
}

export default page;
