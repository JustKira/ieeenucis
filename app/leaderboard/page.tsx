import supaServerClientHandler from "@/lib/Supa/SupaServer";
import { Filter, Trophy } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Top1, Top2, Top3 } from "./Top";
interface LeaderboardPageProps {
  searchParams: { f: number | undefined };
}

const LeaderboardPage = async ({ searchParams }: LeaderboardPageProps) => {
  const supabase = supaServerClientHandler;

  const res = await supabase.from("Role").select("*");

  const userResBuilder = supabase
    .from("User")
    .select("*,UserRole!inner(roleId)")
    .neq("score", 0)
    .order("score", { ascending: false });

  if (searchParams.f) {
    userResBuilder.eq("UserRole.roleId", searchParams.f);
  }

  const users = await userResBuilder;
  //   "User?select=nameSearch,score,UserRole!inner(roleId)" +
  //   "&order=score.desc" +
  //   `${searchParams.f ? `&UserRole.roleId=eq.${searchParams.f}` : ""}`,
  // {}

  return (
    <div className="bg-[url(/kl0.png)] dark:bg-[url(/kl0_dark.png)] flex justify-center items-center bg-cover min-h-screen w-full bg-fixed py-8 mt-16">
      <div className="relative flex flex-col w-full lg:w-3/4 min-h-[800px] bg-background/80 backdrop-blur-lg rounded-md px-4 text-sm">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="my-2 rounded-full w-fit">
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Select Role</DialogTitle>
              <DialogDescription>
                Select a role group to filter all users by this given role
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Link
                className="flex items-center gap-1 mx-1"
                href={"/leaderboard"}
              >
                <Filter size={18} />
                Reset
              </Link>
              {res.data?.map((filter, id) => {
                if (filter.name === "admin") {
                  return <></>;
                }
                return (
                  <Link
                    key={id}
                    className="uppercase"
                    href={`/leaderboard?f=${filter.id}`}
                  >
                    {filter.name}
                  </Link>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex flex-col items-center gap-4 mt-16">
          {/* <div className="flex items-center justify-center w-32 h-32 p-2 text-blue-500 rounded-full dark:text-white bg-background">
            <Trophy size={80} />
          </div> */}
          {users.data?.[0] ? <Top1 user={users.data[0]} /> : <></>}
          <div className="mt-24 flex gap-12">
            <div>{users.data?.[1] ? <Top2 user={users.data[1]} /> : <></>}</div>
            <div className="mt-24">
              {users.data?.[2] ? <Top3 user={users.data[2]} /> : <></>}
            </div>
          </div>
          <div className="py-12 flex gap-6 flex-col">
            {" "}
            {users.data?.map((user, id) => {
              if (id <= 2) {
                return <></>;
              }

              return (
                <div
                  className={`flex items-center justify-between px-4 py-3 text-3xl font-light text-primary-foreground capitalize bg-foreground rounded-md w-[500px] ${
                    id < 3 ? "border border-blue-500" : ""
                  }}`}
                  key={id}
                >
                  <div className="flex gap-2 items-center">
                    <h1 className="mx-2 font-bold">{id + 1}</h1>
                    <h1 className="font-bold text-lg">
                      {user.firstname} {user.lastname}
                    </h1>
                  </div>
                  <h2 className="text-lg">{user.score}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
