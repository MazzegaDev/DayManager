import { Category, User } from "../generated/prisma/client";
import { CategoryInputDto, CategoryUpdateDto } from "../interfaces/categoryDTO";
import AppError from "../errors/AppError";
import CategoryRepository from "../repositories/categoryRepository";
import UserRepository from "../repositories/userRepository";

export default class CategoryService {
	readonly catRepo: CategoryRepository;
	readonly userRepo: UserRepository;

	constructor() {
		this.catRepo = new CategoryRepository();
		this.userRepo = new UserRepository();
	}

	async createCategory(data: CategoryInputDto): Promise<Category> {
		const { cate_name, user_id } = data;

		if (!cate_name.trim()) {
			throw new AppError("Informe um nome valido", 400);
		}

		const user: User | null = await this.userRepo.findUserById(user_id);
		if (!user) {
			throw new AppError("Usuario não encontrado", 404);
		}

		const obj: CategoryInputDto = {
			cate_name,
			user_id,
		};

		const created: Category = await this.catRepo.createCategory(obj);
		if (!created) {
			throw new AppError("Erro ao criar nova categoria", 500);
		}

		return created;
	}

	async findById(cate_id: string): Promise<Category> {
		const id = this.validateId(cate_id);

		const category: Category | null = await this.catRepo.findById(id);
		if (!category) {
			throw new AppError("Categoria não encontrada", 404);
		}

		return category;
	}

	async listUserCategories(user_id: number): Promise<Category[]> {
		const user: User | null = await this.userRepo.findUserById(user_id);
		if (!user) {
			throw new AppError("Usuario não encontrado", 404);
		}

		const list: Category[] = await this.catRepo.listUserCategory(user_id);

		if (list.length === 0) {
			throw new AppError("O usuario ainda não tem nenhuma categoria cadastrada", 404);
		}

		return list;
	}

	async updateCategory(data: CategoryUpdateDto): Promise<Category> {
		const { cate_id, cate_name, user_id } = data;

		const category: Category | null = await this.catRepo.findById(cate_id);
		if (!category) {
			throw new AppError("Categoria não encontrada", 404);
		}

		const user: User | null = await this.userRepo.findUserById(user_id);
		if (!user) {
			throw new AppError("Usuario não encontrado", 404);
		}

		if (cate_name != undefined && !cate_name.trim()) {
			throw new AppError("Informe um nome valido", 400);
		}

		const obj: CategoryUpdateDto = {
			cate_id,
			cate_name,
			user_id,
		};

		const updated: Category = await this.catRepo.updateCategory(obj);
		if (!updated) {
			throw new AppError("Erro ao atualizar dados da categoria", 404);
		}

		return updated;
	}

	async deleteCategory(cate_id: string): Promise<Category> {
		const id = this.validateId(cate_id);

		const category: Category | null = await this.catRepo.findById(id);
		if (!category) {
			throw new AppError("Categoria não encontrada", 404);
		}

		const deleted: Category = await this.catRepo.deleteCategory(id);
		if (!deleted) {
			throw new AppError("Erro ao deletar categoria", 500);
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
