/*
  Warnings:

  - You are about to drop the column `path` on the `UploadFile` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `UploadFile` table without a default value. This is not possible if the table is not empty.
  - Made the column `type` on table `UploadFile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `download` on table `UploadFile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UploadFile" DROP COLUMN "path",
ADD COLUMN     "fileName" TEXT NOT NULL,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "download" SET NOT NULL;
