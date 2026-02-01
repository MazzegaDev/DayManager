import { Response, Request } from "express";
import { UserLoginDto } from "../interfaces/userDTO";
import { jwtUserPayloadDTO } from "../interfaces/jwtPayloadDTO";
import AuthService from "../services/authService";
import AppError from "../errors/AppError";

export default class AuthController {
   readonly authServ: AuthService;

   constructor() {
      this.authServ = new AuthService();
   }

   async returnCurrentUser(req: Request, res: Response): Promise<Response> {
      try {
         if (!req.user) {
            throw new AppError("Nenhum usuario logado no momento", 404);
         }

         return res.status(200).json(req.user);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }

   async login(req: Request, res: Response): Promise<Response> {
      try {
         const { user_email, user_pass } = req.body as UserLoginDto;

         const data: UserLoginDto = {
            user_email,
            user_pass,
         };

         const logged: jwtUserPayloadDTO = await this.authServ.login(data);

         res.cookie(process.env.COOKIE_NAME!, logged.token, {
            httpOnly: true,
         });

         return res.status(200).json(logged);
      } catch (error: any) {
         console.log(error);
         if (error.statusCode) {
            return res.status(error.statusCode).json(error.message);
         }

         return res.status(500).json({ msg: "Erro interno" });
      }
   }
}
