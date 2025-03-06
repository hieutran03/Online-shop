import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CartItemDto {
  @ApiProperty({example: 1, description: 'Product ID'})
  @IsNumber()
  productId: number;
  
  @ApiProperty({example: 1, description: 'Product quantity'})
  @IsNumber()
  quantity: number;
}