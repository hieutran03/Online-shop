import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto{
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  images: string;

  @IsArray()
  categories: number[];

  @IsNumber()
  price: number;
}