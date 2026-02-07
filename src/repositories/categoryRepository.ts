import { Category } from "../generated/prisma/client";
import { Prisma } from "../database/database";
import { CategoryInputDto, CategoryUpdateDto } from "../interfaces/categoryDTO";

export default class CategoryRepository {
   private readonly prisma = Prisma;

   async createCategory(data: CategoryInputDto): Promise<Category> {
      return await this.prisma.category.create({
         data: {
            cate_name: data.cate_name,
            user: {
               connect: { user_id: data.user_id },
            },
         },
      });
   }

   async listUserCategory(user_id: number): Promise<Category[]> {
      return await this.prisma.category.findMany({
         where: { user_id: user_id },
      });
   }

   async findById(cate_id: number): Promise<Category | null> {
      return await this.prisma.category.findUnique({
         where: { cate_id: cate_id },
      });
   }

   async updateCategory(data: CategoryUpdateDto): Promise<Category> {
      return await this.prisma.category.update({
         where: { cate_id: data.cate_id },
         data: {
            cate_name: data.cate_name,
            user: {
               connect: { user_id: data.user_id },
            },
         },
      });
   }

   async deleteCategory(cate_id: number): Promise<Category> {
      return await this.prisma.category.delete({
         where: { cate_id: cate_id },
      });
   }
}
