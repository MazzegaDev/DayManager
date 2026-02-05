import { User } from "../generated/prisma/client";
import { UserLoginDto } from "../interfaces/userDTO";
import { jwtUserPayloadDTO } from "../interfaces/jwtPayloadDTO";
import { jwtSingIn } from "../utils/jwt";
import AppError from "../errors/AppError";
import UserRepository from "../repositories/userRepository";

export default class AuthService {
   private readonly userRepo: UserRepository;

   constructor() {
      this.userRepo = new UserRepository();
   }

   async login(data: UserLoginDto): Promise<jwtUserPayloadDTO> {
      const finded: User | null = await this.userRepo.findUserByEmail(
         data.user_email,
      );

      if (!finded) {
         throw new AppError("Usuario não encontrado", 404);
      }

      if (data.user_pass != finded.user_pass) {
         throw new AppError("Senha invalida", 400);
      }

      const { user_email, user_id, user_name } = finded;

      const token = jwtSingIn({
         user_id,
         user_email,
         user_name,
      });

      const payload: jwtUserPayloadDTO = {
         user_id,
         user_name,
         user_email,
         token,
      };

      return payload;
   }
}
