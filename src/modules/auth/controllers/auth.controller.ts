import { Body, Controller, Get, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { LocalAuthenticationGuard } from 'src/core/guards/local-auth.guard';
import { SigninDto } from '../dtos/sign-in.dto';
import JwtAuthGuard from 'src/core/guards/jwt-auth.guard';
import { ApiBody, ApiCookieAuth, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { Serialize } from 'src/core/interceptors/serialize.interceptor';
import { UserDto } from '../dtos/user.dto';

@Serialize(UserDto)
@ApiCookieAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}
  
  @ApiResponse({status: 200, description: 'Success'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @Get('my-profile')
  @UseGuards(JwtAuthGuard)
  myProfile(@Req() request){
    return request.user;
  }
  
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @Post('signin')
  signin(@Body() signInDto: SigninDto){
    return this.authService.register(signInDto);
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @ApiResponse({ status: 500, description: 'Internal Server Error'})
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @ApiBody({type: LoginDto})
  login(@Req() request, @Res({passthrough: true}) response: Response) {
    const { user } = request;
    const token = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', token);
    response.status(200);
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @Post('logout')
  logout(@Res({passthrough: true}) response: Response){
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    response.sendStatus(200);
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({ status: 500, description: 'Internal Server Error'})
  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto, @Req() request){
    const userId = request.user.id;
    return this.authService.resetPassword(userId, body);
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @ApiResponse({ status: 500, description: 'Internal Server Error'})
  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto){
    return this.authService.forgotPassword(body);
  }
}
