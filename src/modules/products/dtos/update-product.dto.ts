import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto{
  @ApiProperty({example: 'Product name', description: 'Product name'})
  @IsString()
  @IsOptional()
  name: string;
  
  @ApiProperty({example: 'Product description', description: 'Product description'})
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({example: 'https://example.com/image.jpg', description: 'Product images'})
  @IsString()
  @IsOptional()
  images: string;

  @ApiProperty({example: [1, 2, 3], description: 'Product categories'})
  @IsArray()
  categories: number[];

  @ApiProperty({example: 100, description: 'Product price'})
  @IsNumber()
  price: number;
}