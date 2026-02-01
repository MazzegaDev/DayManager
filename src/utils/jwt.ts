import jwt from "jsonwebtoken";
import "dotenv/config";
import { jwtUserPayloadDTO } from "../interfaces/jwtPayloadDTO";
import AppError from "../errors/AppError";

const SECRET = process.env.JWT_SECRET as string;

export function jwtSingIn(payload: jwtUserPayloadDTO): string {
   return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): jwtUserPayloadDTO {
   const decoded = jwt.verify(token, SECRET);

   if (typeof decoded === "string") {
      throw new AppError("Token malformado", 500);
   }

   return decoded as jwtUserPayloadDTO;
}
