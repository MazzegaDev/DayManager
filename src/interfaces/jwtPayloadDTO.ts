import { JwtPayload } from "jsonwebtoken";

export interface jwtUserPayloadDTO extends JwtPayload {
   user_id: number;
   user_name: string;
   user_email: string;
   token?: string;
}


