/*
  Warnings:

  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,password]` on the table `UserPass` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "token";

-- CreateIndex
CREATE UNIQUE INDEX "UserPass_user_id_password_key" ON "UserPass"("user_id", "password");
