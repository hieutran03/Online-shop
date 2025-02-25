import { IsOptional, IsString } from "class-validator";

export class CreateProductDto{
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  images: string;
}