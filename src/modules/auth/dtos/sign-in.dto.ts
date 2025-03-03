import { IsString } from "class-validator";

export class SigninDto {
  @IsString()
  name: string;

  @IsString()
  username: string;
  
  @IsString()
  email: string;

  @IsString()
  password: string;
}