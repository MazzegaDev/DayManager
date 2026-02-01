import { Task } from "../generated/prisma/client";
import { Request, Response } from "express";
import TaskService from "../services/taskService";
import {
   TaskIncludeDto,
   TaskInputDto,
   TaskUpdateDto,
} from "../interfaces/taskDTO";

export default class TaskController {
   readonly taskServ: TaskService;

   constructor() {
      this.taskServ = new TaskService();
   }

   async createTask(req: Request, res: Response): Promise<Response> {
      try {
         const {
            task_name,
            task_priority,
            day_id,
            cate_id,
            task_status,
            user_id,
         } = req.body as TaskInputDto;

         // user_id = req.user.user_id;

         const obj: TaskInputDto = {
            task_name,
            task_status,
            task_priority,
            user_id,
            cate_id,
            day_id,
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
         const list: TaskIncludeDto = await this.taskServ.listUserTask(user_id);

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
