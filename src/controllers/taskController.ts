import { Task } from "../generated/prisma/client";
import { Request, Response } from "express";
import TaskService from "../services/taskService";
import {
   TaskIncludeDto,
   TaskInputDto,
   TaskUpdateDto,
   TaskParams,
   TaskReqParamsCreateDto,
   TaskReqParamsUpdateDto,
} from "../interfaces/taskDTO";
import { CategoryParams } from "../interfaces/categoryDTO";
import { dayParams } from "../interfaces/dayDTO";

export default class TaskController {
   readonly taskServ: TaskService;

   constructor() {
      this.taskServ = new TaskService();
   }

   async createTask(req: Request, res: Response): Promise<Response> {
      try {
         let { task_name, task_priority, cate_id, task_day } =
            req.body as TaskReqParamsCreateDto;

         const user_id = req.user.user_id;
         const obj: TaskInputDto = {
            task_name,
            task_priority,
            task_day,
            user_id,
            cate_id,
         };

         const created: Task = await this.taskServ.createTask(obj);

         return res
            .status(201)
            .json({ msg: "Nova tarefa criada!", data: created });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async listUserTasks(req: Request, res: Response): Promise<Response> {
      try {
         const user_id = req.user.user_id;
         const list: TaskIncludeDto[] =
            await this.taskServ.listUserTask(user_id);

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async listPerCategory(
      req: Request<CategoryParams>,
      res: Response,
   ): Promise<Response> {
      try {
         const { cate_id } = req.params;
         const list: TaskIncludeDto[] =
            await this.taskServ.listPerCategory(cate_id);

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async listPerDay(req: Request<dayParams>, res: Response): Promise<Response> {
      try {
         const { day_id } = req.params;
         const list: TaskIncludeDto[] = await this.taskServ.listPerDay(day_id);

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async findTaskById(
      req: Request<TaskParams>,
      res: Response,
   ): Promise<Response> {
      try {
         const { task_id } = req.params;
         const list: TaskIncludeDto = await this.taskServ.findTaskById(task_id);

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async updateTask(req: Request, res: Response): Promise<Response> {
      try {
         let { task_id, task_name, task_priority, cate_id, task_status } =
            req.body as TaskReqParamsUpdateDto;

         const user_id = req.user.user_id;

         const obj: TaskUpdateDto = {
            task_id,
            task_name,
            task_status,
            task_priority,
            user_id,
            cate_id,
         };

         const created: Task = await this.taskServ.updateTask(obj);

         return res
            .status(201)
            .json({ msg: "Dados da tarefa alterados!", data: created });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async deleteTask(
      req: Request<TaskParams>,
      res: Response,
   ): Promise<Response> {
      try {
         const { task_id } = req.params;
         const list: Task = await this.taskServ.deleteTask(task_id);

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }
}
