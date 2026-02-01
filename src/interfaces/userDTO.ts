export interface UserInputDto {
   user_name: string;
   user_email: string;
   user_pass: string;
}

export interface UserUpdateDto {
   user_id: number;
   user_name?: string;
   user_email?: string;
   user_pass?: string;
}

export interface UserLoginDto {
   user_email: string;
   user_pass: string;
}
export interface UserParams {
   user_id: string;
}