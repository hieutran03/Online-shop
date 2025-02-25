import { IsOptional, IsString } from "class-validator";

export class UpdateProductDto{
  @IsString()
  @IsOptional()
  name: string;
  
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  images: string;
}