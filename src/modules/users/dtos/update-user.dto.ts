import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole } from "../entities/users.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto{
  @ApiProperty({ example: 'Cao Hieu', description: 'The name of the User' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ enum: UserRole, example: 'EDITOR', description: 'The role of the User' })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: 'hieuuit', description: 'The username of the User' })
  @IsOptional()
  @IsEmail()
  email: string;
}