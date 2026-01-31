-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_pass" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,
    "cate_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Task" (
    "task_id" SERIAL NOT NULL,
    "task_name" TEXT NOT NULL,
    "task_priority" TEXT NOT NULL,
    "task_status" TEXT NOT NULL,
    "cate_id" INTEGER NOT NULL,
    "day_id" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "cate_id" SERIAL NOT NULL,
    "cate_name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("cate_id")
);

-- CreateTable
CREATE TABLE "DayOfWeek" (
    "day_id" SERIAL NOT NULL,
    "day_name" TEXT NOT NULL,

    CONSTRAINT "DayOfWeek_pkey" PRIMARY KEY ("day_id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cate_id_fkey" FOREIGN KEY ("cate_id") REFERENCES "Category"("cate_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_cate_id_fkey" FOREIGN KEY ("cate_id") REFERENCES "Category"("cate_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "DayOfWeek"("day_id") ON DELETE RESTRICT ON UPDATE CASCADE;
