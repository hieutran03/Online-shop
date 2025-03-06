import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ForgotPasswordDto {
  @ApiPropertyOptional({ example: 'hieu030103@gmail.com', description: 'Email to send reset password' })
  @IsString()
  @IsOptional()
  email: string;

  @ApiPropertyOptional({ example: 'hieutran', description: 'Username to send reset password' })
  @IsString()
  @IsOptional()
  username: string;
}