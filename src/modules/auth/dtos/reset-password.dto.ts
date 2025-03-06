import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ResetPasswordDto{
  @ApiProperty({example: 'hieutran', description: 'Username to reset password'})
  @IsString()
  password: string;
}