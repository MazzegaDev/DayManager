import { Prisma } from "../generated/prisma/client";

export type TaskStatus = "PENDING" | "DONE";

export interface TaskInputDto {
   task_name: string;
   task_priority: string;
   task_status?: TaskStatus;
   cate_id: number;
   day_id: number;
   user_id?: number;
}


export interface TaskReqParamsCreateDto {
   task_name: string;
   task_priority: string;
   task_status?: TaskStatus;
   cate_id: number;
   day_id: number;
}


export interface TaskUpdateDto {
   task_id: number;
   task_name?: string;
   task_priority?: string;
   task_status?: TaskStatus;
   cate_id?: number;
   day_id?: number;
   user_id: number;
}

export interface TaskReqParamsUpdateDto {
   task_id: number;
   task_name?: string;
   task_priority?: string;
   task_status?: TaskStatus;
   cate_id?: number;
   day_id?: number;

}

export interface TaskParams {
   task_id: string;
}


export type TaskIncludeDto = Prisma.TaskGetPayload<{
   include: { category: true; dayofweek: true; user: true };
}>;
