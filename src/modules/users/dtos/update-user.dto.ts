import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole } from "../entities/users.entity";

export class UpdateUserDto{
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsEmail()
  email: string;
}