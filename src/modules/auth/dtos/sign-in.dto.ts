import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SigninDto {
  @ApiProperty({example: 'Hieu Tran', description: 'Full name'})
  @IsString()
  name: string;

  @ApiProperty({example: 'hieutran', description: 'Username'})
  @IsString()
  username: string;
  
  @ApiProperty({example: 'hieumdg@gmail.com', description: 'Email'})
  @IsString()
  email: string;

  @ApiProperty({example: '123456', description: 'Password'})
  @IsString()
  password: string;
}