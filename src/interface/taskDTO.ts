import { Prisma } from "../generated/prisma/client";

export type TaskInputDto = Omit <
   Prisma.TaskCreateInput,
   "task_id"
>;

export type TaskUpdateDto = {
   task_id: number;
} & Partial<
   Omit<Prisma.TaskUpdateInput, "task_id">
>