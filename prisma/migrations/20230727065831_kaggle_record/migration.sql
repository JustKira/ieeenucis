-- AlterTable
ALTER TABLE "KaggleCompetitionLeaderboard" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "KaggleCompetitionRecord" (
    "id" SERIAL NOT NULL,
    "record" JSONB NOT NULL,

    CONSTRAINT "KaggleCompetitionRecord_pkey" PRIMARY KEY ("id")
);
