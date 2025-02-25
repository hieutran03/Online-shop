import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
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

  async register(createUserDto: CreateUserDto){
    const hashedPassword = await bcrypt.hash(createUserDto.password, parseInt(this.configService.get('BCRYPT_SALT_ROUNDS')));
    const existedUser = await this.usersService.findByUsername(createUserDto.username);
    if(existedUser){
      throw new BadRequestException('username is existed');
    }
    
    const res = await this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword
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

}
