import { User } from "../generated/prisma/client";
import { UserInputDto, UserUpdateDto } from "../interfaces/userDTO";
import AppError from "../errors/AppError";
import UserRepository from "../repositories/userRepository";

export default class UserService {
	readonly userRepo: UserRepository;

	constructor() {
		this.userRepo = new UserRepository();
	}

	async createUser(data: UserInputDto): Promise<User> {
		const { user_email, user_name, user_pass } = data;

		if (!user_email.trim() || !user_name.trim()) {
			throw new AppError("Informe um E-mail e um nome de usuario validos", 400);
		}

		if (user_pass.trim().length <= 5) {
			throw new AppError("A senha deve ser maior que 5 caracteres", 400);
		}

		const obj: UserInputDto = {
			user_email,
			user_name,
			user_pass,
		};

		const created: User = await this.userRepo.createUser(obj);

		if (!created) {
			throw new AppError("Erro ao cadastrar usuario", 500);
		}

		return created;
	}

	async listUser(): Promise<User[]> {
		const list: User[] = await this.userRepo.listUsers();

		if (list.length === 0) {
			throw new AppError("Nenhum usuario para listar", 404);
		}

		return list;
	}

	async findById(user_id: string): Promise<User> {
		const id = this.validateId(user_id);

		const finded: User | null = await this.userRepo.findUserById(id);

		if (!finded) {
			throw new AppError("Usuario não encontrado", 404);
		}

		return finded;
	}

	async findByEmail(user_email: string): Promise<User> {
		const finded: User | null = await this.userRepo.findUserByEmail(user_email);

		if (!finded) {
			throw new AppError("Usuario não encontrado", 404);
		}

		return finded;
	}

	async updateUser(data: UserUpdateDto): Promise<User> {
		const finded: User | null = await this.userRepo.findUserById(data.user_id);

		if (!finded) {
			throw new AppError("Usuario não encontrado", 404);
		}

		if (data.user_email != undefined && !data.user_email.trim()) {
			throw new AppError("Informe um email valido", 400);
		}

		if (data.user_name != undefined && !data.user_name.trim()) {
			throw new AppError("Informe uma nome valida", 400);
		}

		if (data.user_pass != undefined && data.user_pass.trim().length <= 5) {
			throw new AppError("A senha deve ser maior que 5 caracteres", 400);
		}

		const updated: User = await this.userRepo.updateUser(data);

		if (!updated) {
			throw new AppError("Erro ao atualizar dados do usuario", 500);
		}

		return updated;
	}

	async deleteUser(user_id: string): Promise<User> {
		const id = this.validateId(user_id);

		const finded: User | null = await this.userRepo.findUserById(id);

		if (!finded) {
			throw new AppError("Usuario não encontrado", 404);
		}

		const deleted: User = await this.userRepo.deleteUser(id);

		if (!deleted) {
			throw new AppError("Erro ao deletar usuario", 500);
		}

		return deleted;
	}

	validateId(params: number | string): number {
		if (typeof params === "number") {
			return params;
		}

		const id = parseInt(params);
		if (isNaN(id)) {
			throw new AppError("Informe um numero", 400);
		}
		return id;
	}
}
