import { IsNumber, IsOptional } from "class-validator";

export class CartItemDto {
  @IsNumber()
  productId: number;
  
  @IsNumber()
  quantity: number;
}