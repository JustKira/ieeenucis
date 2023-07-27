/*
  Warnings:

  - A unique constraint covering the columns `[competitionId]` on the table `KaggleCompetitionRecord` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `competitionId` to the `KaggleCompetitionRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KaggleCompetitionRecord" ADD COLUMN     "competitionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "KaggleCompetitionRecord_competitionId_key" ON "KaggleCompetitionRecord"("competitionId");
