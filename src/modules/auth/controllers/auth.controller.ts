import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { Response } from 'express';
import { LocalAuthenticationGuard } from 'src/core/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}
  @Post('signin')
  signin(@Body() createUserDto: CreateUserDto){
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  login(@Req() request, @Res({passthrough: true}) response: Response) {
    const { user } = request;
    const token = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', token);
    return user;
  }

  @Post('logout')
  logout(@Res({passthrough: true}) response: Response){
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
  }
}
