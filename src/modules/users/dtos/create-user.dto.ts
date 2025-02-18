import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole } from "../entities/users.entity";

export class CreateUserDto{
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}