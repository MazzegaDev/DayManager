/*
  Warnings:

  - You are about to drop the column `cate_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `task_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cate_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_task_id_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cate_id",
DROP COLUMN "task_id";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
