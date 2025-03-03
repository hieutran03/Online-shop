import { Body, Controller, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { Response } from 'express';
import { LocalAuthenticationGuard } from 'src/core/guards/local-auth.guard';
import { SigninDto } from '../dtos/sign-in.dto';
import JwtAuthGuard from 'src/core/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}
  @Post('signin')
  signin(@Body() signInDto: SigninDto){
    return this.authService.register(signInDto);
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

  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  resetPassword(@Body() body){
    return this.authService.resetPassword(body);
  }

  @Post('forgot-password')
  forgotPassword(@Body() body){
    return this.authService.forgotPassword(body);
  }

}
