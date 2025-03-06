import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: 'hieutran', description: 'Username to login' })
  @IsString()
  username: string;

  @ApiProperty({ example: '123456', description: 'Password to login' })
  @IsString()
  password: string;
}