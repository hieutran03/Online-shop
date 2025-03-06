import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateCategoryDto{
  @ApiProperty({example: 'Category name', description: 'Category name'})
  @IsString()
  name: string;
  
  @ApiProperty({example: 'Category description', description: 'Category description'})
  @IsString()
  description: string;
}