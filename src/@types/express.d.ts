import "express";

declare module "express-serve-static-core" {
   interface Request {
      user?: {
         user_id: number;
         user_name: string;
         user_email: string;
      };
   }
}
