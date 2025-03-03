import { IsOptional, IsString } from "class-validator";

export class ForgotPasswordDto {
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  username: string;
}