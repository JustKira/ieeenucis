/*
  Warnings:

  - You are about to drop the column `rolesId` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `UserRole` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `UserRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_rolesId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_usersId_fkey";

-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "rolesId",
DROP COLUMN "usersId",
ADD COLUMN     "roleId" BIGINT NOT NULL,
ADD COLUMN     "userId" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
