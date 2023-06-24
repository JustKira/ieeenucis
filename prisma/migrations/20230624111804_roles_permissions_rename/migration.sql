/*
  Warnings:

  - You are about to drop the column `perms` on the `roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "roles" DROP COLUMN "perms",
ADD COLUMN     "permissions" TEXT[];
