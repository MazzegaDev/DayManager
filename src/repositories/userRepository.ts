import { User } from "../generated/prisma/client";
import { Prisma } from "../database/database";
import { UserInputDto, UserUpdateDto } from "../interfaces/userDTO";

export default class UserRepository {
   readonly prisma = Prisma;

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
}
