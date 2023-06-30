import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import supaServerClientHandler from "@/lib/Supa/SupaServer";
import Link from "next/link";
import React from "react";

const page = async () => {
  const supabase = supaServerClientHandler;

  const { data: kaggleData, error } = await supabase
    .from("KaggleCompetitionLeaderboard")
    .select();

  return (
    <div className="bg-[url(/kl0.png)] dark:bg-[url(/kl0_dark.png)] bg-center bg-cover bg-no-repeat flex justify-center items-center min-h-screen w-full bg-fixed py-32">
      <Card>
        <CardHeader>
          <CardTitle>Kaggle Competitions</CardTitle>
          <CardDescription>
            Choose a Kaggle Competition to view its leaderboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {kaggleData?.map((kaggle, id) => {
            return (
              <Link className="" href={`/kaggle/${kaggle.competitionId}`}>
                <Button
                  variant={"outline"}
                  className="flex flex-col items-start justify-center w-full py-14"
                >
                  <h1 className="text-base font-light uppercase opacity-75">
                    Competition
                  </h1>
                  <h1 className="text-xl font-bold ">{kaggle.name}</h1>
                </Button>{" "}
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
