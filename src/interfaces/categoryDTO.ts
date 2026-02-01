export interface CategoryInputDto {
   cate_name: string;
   user_id: number;
}

export interface CategoryUpdateDto {
   cate_id: number;
   cate_name?: string;
   user_id: number;
}

export interface CategoryParams {
   cate_id: string;
}