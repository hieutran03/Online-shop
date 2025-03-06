import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class QueryFilterDto{
  @ApiPropertyOptional({example: 'product name', description: 'Product name'})
  @IsString()
  @IsOptional()
  name: string;
}