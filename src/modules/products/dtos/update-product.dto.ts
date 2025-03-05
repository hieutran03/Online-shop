import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto{
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
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