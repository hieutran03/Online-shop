import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ResetPasswordDto{
  @ApiProperty()
  @IsString()
  password: string;
}