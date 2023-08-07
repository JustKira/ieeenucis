import React from "react";
import KaggleListRenderer from "./KaggleListRenderer";
import supaServerClientHandler from "@/lib/Supa/SupaServer";
import KaggleReload from "./KaggleReload";

interface KIDPageProps {
  params: { kid: string };
}
const KIDPage: React.FC<KIDPageProps> = async ({ params }) => {
  const supabase = supaServerClientHandler;

  const { data: kaggleData, error } = await supabase
    .from("KaggleCompetitionLeaderboard")
    .select()
    .eq("competitionId", params.kid)
    .limit(1)
    .single();

  if (error) {
    return <>Error</>;
  }
  if (!kaggleData) {
    return <>{params.kid} Couldn't be found</>;
  }

  const res = await fetch(
    process.env.API_PATH + `api/kaggle_record?competitionId=${params.kid}`,
    {
      method: "GET",
    }
  );
  const kaggleRes = await res.json();
  const data = kaggleRes?.data?.record;
  return (
    <div className="bg-[url(/kl0.png)] dark:bg-[url(/kl0_dark.png)] bg-center bg-cover bg-no-repeat flex justify-center items-center min-h-screen w-full bg-fixed py-32">
      <div className="flex flex-col  w-[900px] p-2 gap-5 rounded-lg bg-background/90 backdrop-blur-lg">
        <div className="flex flex-col items-start p-8">
          <h2 className="mb-2 text-lg uppercase text-primary pl-7">
            leaderboard <KaggleReload kid={params.kid} />
          </h2>
          <h2 className="px-8 py-2 text-2xl font-black uppercase bg-blue-500 rounded-full dark:bg-blue-600 text-primary-foreground">
            {kaggleData?.name}
          </h2>
        </div>
        {data?.submissions ? (
          <KaggleListRenderer
            text={kaggleData.rewardDescription}
            reward={kaggleData.reward}
            submissions={data.submissions}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default KIDPage;
