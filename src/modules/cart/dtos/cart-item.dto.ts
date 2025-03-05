import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CartItemDto {
  @ApiProperty()
  @IsNumber()
  productId: number;
  
  @ApiProperty()
  @IsNumber()
  quantity: number;
}