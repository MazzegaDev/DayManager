import { Prisma } from "../generated/prisma/client";

export type CategoryInputDto = Omit<Prisma.CategoryCreateInput, "cate_id">;

export type CategoryUpdateDto = {
   cate_id: number;
} & Partial<Omit<Prisma.CategoryUpdateInput, "cate_id">>;
