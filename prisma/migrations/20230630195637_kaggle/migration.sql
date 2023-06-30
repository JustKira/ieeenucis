-- CreateTable
CREATE TABLE "KaggleCompetitionLeaderboard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "reward" INTEGER NOT NULL DEFAULT 3,
    "rewardDescription" TEXT NOT NULL DEFAULT 'Reward Tooltip',

    CONSTRAINT "KaggleCompetitionLeaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KaggleCompetitionLeaderboard_competitionId_key" ON "KaggleCompetitionLeaderboard"("competitionId");
