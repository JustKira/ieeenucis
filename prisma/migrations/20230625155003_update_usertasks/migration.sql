-- AlterTable
ALTER TABLE "UserTask" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "finished" BOOLEAN NOT NULL DEFAULT false;
