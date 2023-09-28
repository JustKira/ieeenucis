"use client";
import { Database } from "@/lib/database";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";
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

function page() {
  const supabase = createClientComponentClient<Database>();
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
    if (selected) getUserQuiz(selected);
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
            <Select onValueChange={(v) => setSelected(Number(v))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Quiz Schedule" />
              </SelectTrigger>
              <SelectContent>
                {schedules?.map((s) => (
                  <SelectItem value={s.id.toString()}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-col gap-2 py-2">
              {userQuiz?.map((d) => {
                const user = users.find((u) => u.id === d.userId);
                return (
                  <Card className="flex gap-4 px-4 py-2">
                    <User2 className="w-4" />
                    <div className="flex gap-2">
                      <h2 className="w-20 font-light">
                        {" "}
                        {d.autoGrade}
                        {"  /"}
                        {d.QuizSchedule?.Quiz?.totalMarks}
                      </h2>
                      <div className="flex flex-col gap-4 font-medium capitalize">
                        <h1>
                          {user?.firstname} {user?.lastname}
                        </h1>
                        <h1 className="text-xs">
                          {d.attendedAt ? (
                            <> {format(new Date(d.attendedAt), "ppp")}</>
                          ) : (
                            <></>
                          )}
                        </h1>
                      </div>
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
