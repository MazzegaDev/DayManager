import { Prisma } from "../generated/prisma/client";

export type TaskStatus = "Pendente" | "Finalizado";

export interface TaskInputDto {
   task_name: string;
   task_priority: string;
   task_day: string;
   cate_id: number;
   user_id: number;
}

export interface TaskCreateDateDto {
   task_name: string;
   task_priority: string;
   task_status?: TaskStatus;
   task_day: Date;
   cate_id: number;
   user_id: number;
}

export interface TaskReqParamsCreateDto {
   task_name: string;
   task_priority: string;
   task_status?: TaskStatus;
   task_day: string;
   cate_id: number;

}

export interface TaskUpdateDto {
   task_id: number;
   task_name?: string;
   task_priority?: string;
   task_status?: TaskStatus;
   task_day?: string;
   cate_id?: number;

   user_id: number;
}

export interface TaskUpdateDateDto {
   task_id: number;
   task_name?: string;
   task_priority?: string;
   task_status?: TaskStatus;
   task_day?: Date;
   cate_id?: number;

   user_id: number;
}


export interface TaskReqParamsUpdateDto {
   task_id: number;
   task_name?: string;
   task_priority?: string;
   task_status?: TaskStatus;
   task_day?: string;
   cate_id?: number;

}

export interface TaskParams {
   task_id: string;
}

export type TaskIncludeDto = Prisma.TaskGetPayload<{
	include: {
		category: true;
		user: {
			select: {
				user_id: true;
				user_name: true;
				user_email: true;
			};
		};
	};
}>;
