import { Category, Task, User } from "../generated/prisma/client";
import {
   TaskCreateDateDto,
   TaskIncludeDto,
   TaskInputDto,
   TaskUpdateDto,
   TaskUpdateDateDto,
} from "../interfaces/taskDTO";
import AppError from "../errors/AppError";
import TaskRepository from "../repositories/taskRepository";
import UserRepository from "../repositories/userRepository";
import CategoryRepository from "../repositories/categoryRepository";

export default class TaskService {
   private taskRepo: TaskRepository;
   private userRepo: UserRepository;
   private cateRepo: CategoryRepository;
   constructor() {
      this.taskRepo = new TaskRepository();
      this.userRepo = new UserRepository();
      this.cateRepo = new CategoryRepository();
   }

   async createTask(data: TaskInputDto): Promise<Task> {
      let {
         task_name,
         task_priority,
         user_id,
         cate_id,
         task_day,
      } = data;

      const findedCategory: Category | null =
         await this.cateRepo.findById(cate_id);
      if (!findedCategory) {
         throw new AppError("Categoria não encontrada", 404);
      }

      const findedUser: User | null = await this.userRepo.findUserById(user_id);
      if (!findedUser) {
         throw new AppError("Usuario não encontrado", 404);
      }

      if (!task_name.trim()) {
         throw new AppError("Nome da tarefa invalido", 400);
      }
      if (!task_priority.trim()) {
         throw new AppError("Prioridade da tarefa invalida", 400);
      }
      if (!task_day) {
         throw new AppError("Informe o dia da tarefa", 400);
      }

      const task_status = "Pendente";
      const parsedData = this.dateConverter(task_day);
      const obj: TaskCreateDateDto = {
         task_name,
         task_priority,
         task_status,
         task_day: parsedData,
         user_id,
         cate_id,
      };

      const created: Task = await this.taskRepo.createTask(obj);

      if (!created) {
         throw new AppError("Erro ao criar tarefa", 500);
      }

      return created;
   }

   async listUserTask(user_id: number): Promise<TaskIncludeDto[]> {
      const finded: User | null = await this.userRepo.findUserById(user_id);

      if (!finded) {
         throw new AppError("Usuario não encontrado", 404);
      }

      let list: TaskIncludeDto[] = await this.taskRepo.listUserTask(user_id);

      if (list.length === 0) {
         throw new AppError("Esse usuario ainda não tem nenhuma tarefa", 404);
      }

      return list;
   }

   async listPerCategory(cate_id: string | number): Promise<TaskIncludeDto[]> {
      const id = this.validateId(cate_id);

      let list: TaskIncludeDto[] = await this.taskRepo.listPerCategory(id);

      if (list.length === 0) {
         throw new AppError("Essa categoria ainda não tem nenhuma tarefa", 404);
      }

      return list;
   }

   async listPerDay(day_id: string): Promise<TaskIncludeDto[]> {
      const id = this.validateId(day_id);

      let list: TaskIncludeDto[] = await this.taskRepo.listPerDay(id);

      if (list.length === 0) {
         throw new AppError("Esse dia ainda não tem nenhuma tarefa", 404);
      }

      return list;
   }

   async findTaskById(task_id: string): Promise<TaskIncludeDto> {
      const id = this.validateId(task_id);

      const finded: TaskIncludeDto | null =
         await this.taskRepo.findTaskById(id);

      if (!finded) {
         throw new AppError("Tarefa não encontrada", 404);
      }

      return finded;
   }

   async updateTask(data: TaskUpdateDto): Promise<Task> {
      let {
         task_id,
         task_name,
         task_priority,
         task_status,
         user_id,
         cate_id,
         task_day,
      } = data;

      const findedTask: Task | null = await this.taskRepo.findTaskById(task_id);

      const findedUser: User | null = await this.userRepo.findUserById(user_id);

      if (!findedUser) {
         throw new AppError("Usuario não encontrado", 404);
      }

      if (!findedTask) {
         throw new AppError("Tarefa não encontrada", 404);
      }

      if (task_name != undefined && !task_name.trim()) {
         throw new AppError("Nome da tarefa invalido", 400);
      }

      if (task_priority != undefined && !task_priority.trim()) {
         throw new AppError("Prioridade da tarefa invalida", 400);
      }

      if (task_status != undefined && !task_status.trim()) {
         throw new AppError("Status da tarefa invalido", 400);
      }

      let parsedDate: Date | undefined;
      if (task_day != undefined) {
         parsedDate = this.dateConverter(task_day);
      }

      const obj: TaskUpdateDateDto = {
         task_id,
         user_id,
         cate_id,
         task_name,
         task_priority,
         task_day: parsedDate,
         task_status,
      };

      const updated: Task = await this.taskRepo.updateTask(obj);

      if (!updated) {
         throw new AppError(
            "Não foi possivel atualizar os dados da tarefa",
            500,
         );
      }

      return updated;
   }

   async deleteTask(task_id: string): Promise<Task> {
      const id = this.validateId(task_id);

      const finded: TaskIncludeDto | null =
         await this.taskRepo.findTaskById(id);

      if (!finded) {
         throw new AppError("Tarefa não encontrada", 404);
      }

      const deleted: Task = await this.taskRepo.deleteTask(id);

      if (!deleted) {
         throw new AppError("Não foi possivel excluir a tarefa", 500);
      }

      return deleted;
   }

   validateId(params: string | number): number {
      if (typeof params === "number") {
         return params;
      }

      const id = parseInt(params);

      if (isNaN(id)) {
         throw new AppError("Informe um numero", 400);
      }

      return id;
   }

   dateConverter(date: string): Date {
      const parsedData = new Date(date);

      if (isNaN(parsedData.getTime())) {
         throw new AppError("Data da tarefa inválida", 400);
      }

      return parsedData;
   }
}
