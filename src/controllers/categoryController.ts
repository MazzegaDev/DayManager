import { Category } from "../generated/prisma/client";
import { Request, Response } from "express";
import {
   CategoryInputDto,
   CategoryParams,
   CategoryUpdateDto,
   CategoryReqCreateData,
   CategoryReqUpdateData,
} from "../interfaces/categoryDTO";
import CategoryService from "../services/categoryService";

export default class CategoryController {
   private readonly cateServ: CategoryService;

   constructor() {
      this.cateServ = new CategoryService();
   }

   async createCategory(req: Request, res: Response): Promise<Response> {
      try {
         const { cate_name } = req.body as CategoryReqCreateData;

         const user_id = req.user.user_id;
         const data: CategoryInputDto = {
            cate_name,
            user_id,
         };

         const created: Category = await this.cateServ.createCategory(data);

         return res
            .status(201)
            .json({ msg: "Nova categoria criada!", data: created });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async listUserCategory(
      req: Request,
      res: Response,
   ): Promise<Response> {
      try {
         const user_id = req.user.user_id;

         const list: Category[] = await this.cateServ.listUserCategories(user_id);

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async findById(
      req: Request<CategoryParams>,
      res: Response,
   ): Promise<Response> {
      try {
         const { cate_id } = req.params as CategoryParams;

         const list: Category = await this.cateServ.findById(cate_id);

         return res.status(200).json(list);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async updateCategory(req: Request, res: Response): Promise<Response> {
      try {
         const { cate_id, cate_name } = req.body as CategoryReqUpdateData;
         const user_id = req.user.user_id;
         const obj: CategoryUpdateDto = {
            cate_id,
            cate_name,
            user_id,
         };

         const updated: CategoryUpdateDto =
            await this.cateServ.updateCategory(obj);

         return res
            .status(200)
            .json({ msg: "Dados da categoria alterados!", data: updated });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async deleteCategory(
      req: Request<CategoryParams>,
      res: Response,
   ): Promise<Response> {
      try {
         const { cate_id } = req.params as CategoryParams;

         const deleted: Category = await this.cateServ.deleteCategory(cate_id);

         return res
            .status(200)
            .json({ msg: "Categoria deletada!", data: deleted });
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }
}
