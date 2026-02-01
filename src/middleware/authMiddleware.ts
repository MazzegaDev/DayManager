import { Request, Response, NextFunction} from "express";
import {verifyToken} from "../utils/jwt";
import {jwtUserPayloadDTO} from "../interfaces/jwtPayloadDTO";

export default class AuthMiddleware{

   validadeAuth(req: Request, res: Response, next: NextFunction): Response | undefined{
      const token = req.cookies[process.env.COOKIE_NAME!];

      if(!token){
         return res.status(401).json({msg: "Token não encontrado"});
      }

      try {
         const payload: jwtUserPayloadDTO = verifyToken(token);

         req.user = {
            user_id: payload.user_id,
            user_name: payload.user_name,
            user_email: payload.user_email,
         }


         next();
      } catch (error) {
         return res.status(401).json({msg: "Token invalido ou expirado"});
      }
   }
}
