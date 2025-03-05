import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class QueryFilterDto{
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
}