import { Prisma } from "../generated/prisma/client";

export type UserInputDto = Omit<Prisma.UserCreateInput, "user_id">;

export type UserUpdateDto = { user_id: number } & Partial<
   Omit<Prisma.UserUpdateInput, "user_id">
>;
