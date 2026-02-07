import { Prisma } from "../database/database";
import { Task } from "../generated/prisma/client";
import {
	TaskIncludeDto,
	TaskStatus,
	TaskCreateDateDto,
	TaskUpdateDateDto,
} from "../interfaces/taskDTO";

export default class TaskRepository {
	private readonly prisma = Prisma;
	private readonly defaultStatus: TaskStatus = "Pendente";

	async createTask(data: TaskCreateDateDto): Promise<Task> {
		return await this.prisma.task.create({
			data: {
				task_name: data.task_name,
				task_priority: data.task_priority,
				task_status: data.task_status ?? this.defaultStatus,
				task_day: data.task_day,
				category: {
					connect: { cate_id: data.cate_id },
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
				user: true,
			},
		});
	}

	async listPerCategory(cate_id: number, user_id: number): Promise<TaskIncludeDto[]> {
		return await this.prisma.task.findMany({
			where: { cate_id: cate_id, AND: [{ user_id: user_id }] },
			include: {
				category: true,
				user: true,
			},
		});
	}

	async findTaskById(task_id: number): Promise<TaskIncludeDto | null> {
		return await this.prisma.task.findUnique({
			where: { task_id: task_id },
			include: {
				category: true,

				user: true,
			},
		});
	}

	async updateTask(data: TaskUpdateDateDto): Promise<Task> {
		return await this.prisma.task.update({
			where: { task_id: data.task_id },
			data: {
				task_name: data.task_name,
				task_priority: data.task_priority,
				task_status: data.task_status ?? this.defaultStatus,
				task_day: data.task_day,
				category: {
					connect: { cate_id: data.cate_id },
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
