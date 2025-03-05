import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SigninDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  username: string;
  
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}