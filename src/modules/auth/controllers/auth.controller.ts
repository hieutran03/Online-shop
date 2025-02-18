import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}
  @Post('/signin')
  signin(@Body() createUserDto: CreateUserDto){
    return this.authService.register(createUserDto);
  }
}
