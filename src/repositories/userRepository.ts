import { User } from "../generated/prisma/client";
import { Prisma } from "../database/database";
import { UserInputDto, UserUpdateDto } from "../interfaces/userDTO";

export default class UserRepository {
   readonly prisma = Prisma;

   async createUser(data: UserInputDto): Promise<User> {
      return await this.prisma.user.create({
         data: {
            user_email: data.user_email,
            user_name: data.user_name,
            user_pass: data.user_pass,
         },
      });
   }

   async listUsers(): Promise<User[]> {
      return await this.prisma.user.findMany();
   }

   async findById(user_id: number): Promise<User | null> {
      return await this.prisma.user.findUnique({
         where: { user_id: user_id },
      });
   }

   async updateUser(data: UserUpdateDto): Promise<User> {
      return await this.prisma.user.update({
         where: { user_id: data.user_id },
         data: {
            user_email: data.user_email,
            user_name: data.user_name,
            user_pass: data.user_pass,
         },
      });
   }

   async deleteUser(user_id: number): Promise<User> {
      return await this.prisma.user.delete({
         where: { user_id: user_id },
      });
   }

   async validateUser(
      user_email: string,
      user_pass: string,
   ): Promise<User | null> {
      const user = await this.prisma.user.findUnique({
         where: { user_email: user_email },
      });

      if (!user) {
         return null;
      }

      if (user.user_pass != user_pass) {
         return null;
      }

      return user;
   }

   async findUserByEmail(user_email: string): Promise<User | null> {
      return await this.prisma.user.findUnique({
         where: { user_email: user_email },
      });
   }

   async findUserById(user_id: number): Promise<User | null> {
      return await this.prisma.user.findUnique({
         where: { user_id: user_id },
      });
   }
}
