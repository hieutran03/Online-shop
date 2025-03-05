import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'T.C.Hieu', description: 'The name of the User' })
  @IsString()
  name: string;

  @ApiProperty({ enum: UserRole, example: 'ADMIN', description: 'The role of the User' })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: 'hieuuit', description: 'The username of the User' })
  @IsString()
  username: string;

  @ApiProperty({ example: '@svK16', description: 'The password of the User' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'uitk16@gmail.com', description: 'The email of the User' })
  @IsEmail()
  email: string;
}
