import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto{
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  images: string;

  @ApiProperty()
  @IsArray()
  categories: number[];

  @ApiProperty()
  @IsNumber()
  price: number;
}