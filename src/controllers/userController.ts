import { Request, Response } from "express";
import { UserEmailParams, UserInputDto, UserParams, UserUpdateDto } from "../interfaces/userDTO";
import { User } from "../generated/prisma/client";
import UserService from "../services/userService";

export default class UserController {
	private readonly userServ: UserService;

	constructor() {
		this.userServ = new UserService();
	}

	async createUser(req: Request, res: Response): Promise<Response> {
		try {
			const { user_email, user_name, user_pass } = req.body as UserInputDto;

			const obj: UserInputDto = {
				user_email,
				user_name,
				user_pass,
			};

			const created: User = await this.userServ.createUser(obj);

			return res.status(201).json({ msg: "Novo usuario cadastrado!", data: created });
		} catch (error: any) {
			console.log(error);
			if (error.statusCode) {
				return res.status(error.statusCode).json(error.message);
			}

			return res.status(500).json({ msg: "Erro interno" });
		}
	}

	async listUser(req: Request, res: Response): Promise<Response> {
		try {
			const list: User[] = await this.userServ.listUser();

			return res.status(200).json(list);
		} catch (error: any) {
			console.log(error);
			if (error.statusCode) {
				return res.status(error.statusCode).json(error.message);
			}

			return res.status(500).json({ msg: "Erro interno" });
		}
	}

	async findByid(req: Request<UserParams>, res: Response): Promise<Response> {
		try {
			const { user_id } = req.params as UserParams;

			const user: User = await this.userServ.findById(user_id);

			return res.status(200).json(user);
		} catch (error: any) {
			console.log(error);
			if (error.statusCode) {
				return res.status(error.statusCode).json(error.message);
			}

			return res.status(500).json({ msg: "Erro interno" });
		}
	}

	async findByEmail(req: Request<UserEmailParams>, res: Response): Promise<Response> {
		try {
			const { user_email } = req.params as UserEmailParams;

			const user: User = await this.userServ.findById(user_email);

			return res.status(200).json(user);
		} catch (error: any) {
			console.log(error);
			if (error.statusCode) {
				return res.status(error.statusCode).json(error.message);
			}

			return res.status(500).json({ msg: "Erro interno" });
		}
	}

	async updateUser(req: Request, res: Response): Promise<Response> {
		try {
			const { user_id, user_email, user_name, user_pass } = req.body as UserUpdateDto;

			const obj: UserUpdateDto = {
				user_id,
				user_email,
				user_name,
				user_pass,
			};

			const created: User = await this.userServ.updateUser(obj);

			return res.status(201).json({ msg: "Dados do usuario alterados!", data: created });
		} catch (error: any) {
			console.log(error);
			if (error.statusCode) {
				return res.status(error.statusCode).json(error.message);
			}

			return res.status(500).json({ msg: "Erro interno" });
		}
	}

	async deleteUser(req: Request<UserParams>, res: Response): Promise<Response> {
		try {
			const { user_id } = req.params as UserParams;

			const deleted: User = await this.userServ.deleteUser(user_id);

			return res.status(200).json({ msg: "Usuario deletado!", data: deleted });
		} catch (error: any) {
			console.log(error);
			if (error.statusCode) {
				return res.status(error.statusCode).json(error.message);
			}

			return res.status(500).json({ msg: "Erro interno" });
		}
	}
}
