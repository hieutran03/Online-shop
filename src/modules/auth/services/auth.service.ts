import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { SigninDto } from '../dtos/sign-in.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { CommandBus } from '@nestjs/cqrs';
import { ForgotPasswordCommand } from '../commands/impl/forgot-password.command';
import { PasswordGeneratorUtil } from 'src/common/utils/password-gentaror.util';
import { ResetPasswordCommand } from '../commands/impl/reset-password.command';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly commandBus: CommandBus,
  ){}

  public async getAuthenticatedUser(username: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.findByUsername(username);
      if(!user){
        throw new BadRequestException('Wrong Wrong credentials provided')
      }
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Wrong Wrong credentials provided')
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  async register(siginDto: SigninDto){
    const hashedPassword = await bcrypt.hash(siginDto.password, parseInt(this.configService.get('BCRYPT_SALT_ROUNDS')));
    const existedUser = await this.usersService.findByUsername(siginDto.username);
    if(existedUser){
      throw new BadRequestException('username is existed');
    }
    
    const res = await this.usersService.createUser({
      ...siginDto,
      password: hashedPassword,
      role: undefined
    });
    return res;
  }

  public getCookieWithJwtToken(userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public getCookieForLogOut() {
    return 'Authentication=; HttpOnly; Path=/; Max-Age=0';
  }

  public async forgotPassword(forgotPasswordDto: ForgotPasswordDto){
    const user = await this.usersService.findByUsername(forgotPasswordDto.username);
    if(!user){
      throw new BadRequestException('User not found');
    }
    const newPasssword = PasswordGeneratorUtil.generatePassword()
    const hashedPassword = await bcrypt.hash(newPasssword, parseInt(this.configService.get('BCRYPT_SALT_ROUNDS')));
    await this.commandBus.execute(new ForgotPasswordCommand(
      user.id,
      newPasssword,
      hashedPassword
    ));
  }

  public async resetPassword(userId: number, body: ResetPasswordDto){
    const hashedPassword = await bcrypt.hash(body.password, parseInt(this.configService.get('BCRYPT_SALT_ROUNDS')));
    const user = await this.usersService.findById(userId);
    if(!user){
      throw new BadRequestException('User not found');
    }
    await this.commandBus.execute(new ResetPasswordCommand(user.id, hashedPassword))
  }
}
