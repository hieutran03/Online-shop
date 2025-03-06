import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto{
  @ApiProperty({example: 'Product Name', description: 'Name of the product'})
  @IsString()
  name: string;

  @ApiProperty({example: 'Product Description', description: 'Description of the product'})
  @IsString()
  description: string;

  @ApiProperty({example: 'https://example.com/image.jpg', description: 'Image URL of the product'})
  @IsString()
  @IsOptional()
  images: string;

  @ApiProperty({example: [1, 2], description: 'Array of category IDs'})
  @IsArray()
  categories: number[];

  @ApiProperty({example: 100, description: 'Price of the product'})
  @IsNumber()
  price: number;
}