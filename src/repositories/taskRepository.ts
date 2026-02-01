import { Prisma } from "../database/database";
import { Task } from "../generated/prisma/client";
import {
   TaskInputDto,
   TaskUpdateDto,
   TaskIncludeDto,
   TaskStatus,
} from "../interfaces/taskDTO";

export default class TaskRepository {
   readonly prisma = Prisma;
   readonly defaultStatus: TaskStatus = "PENDING";

   async createTask(data: TaskInputDto): Promise<Task> {
      return await this.prisma.task.create({
         data: {
            task_name: data.task_name,
            task_priority: data.task_priority,
            task_status: data.task_status ?? this.defaultStatus,
            category: {
               connect: { cate_id: data.cate_id },
            },
            dayofweek: {
               connect: { day_id: data.day_id },
            },
            user: {
               connect: { user_id: data.user_id },
            },
         },
      });
   }

   async listUserTask(user_id: number): Promise<TaskIncludeDto[]> {
      return await this.prisma.task.findMany({
         where: { user_id: user_id },
         include: {
            category: true,
            dayofweek: true,
            user: true,
         },
      });
   }

   async listPerCategory(cate_id: number): Promise<TaskIncludeDto[]> {
      return await this.prisma.task.findMany({
         where: { cate_id: cate_id },
         include: {
            category: true,
            dayofweek: true,
            user: true,
         },
      });
   }

   async listPerDay(day_id: number): Promise<TaskIncludeDto[]> {
      return await this.prisma.task.findMany({
         where: { day_id: day_id },
         include: {
            category: true,
            dayofweek: true,
            user: true,
         },
      });
   }

   async findTaskById(task_id: number): Promise<TaskIncludeDto | null>{
      return await this.prisma.task.findUnique({
         where: {task_id: task_id},
         include: {
            category: true,
            dayofweek: true,
            user: true,
         }
      })
   }

   async updateTask(data: TaskUpdateDto): Promise<Task> {
      return await this.prisma.task.update({
         where: { task_id: data.task_id },
         data: {
            task_name: data.task_name,
            task_priority: data.task_priority,
            task_status: data.task_status ?? this.defaultStatus,
            category: {
               connect: { cate_id: data.cate_id },
            },
            dayofweek: {
               connect: { day_id: data.day_id },
            },
            user: {
               connect: { user_id: data.user_id },
            },
         },
      });
   }

   async deleteTask(task_id: number): Promise<Task> {
      return await this.prisma.task.delete({
         where: { task_id: task_id },
      });
   }
}
