import { IsOptional, IsString } from "class-validator";

export class QueryFilterDto{
  @IsString()
  @IsOptional()
  name: string;
}