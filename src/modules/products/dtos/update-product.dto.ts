import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

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

  @IsArray()
  categories: number[];

  @IsNumber()
  price: number;
}