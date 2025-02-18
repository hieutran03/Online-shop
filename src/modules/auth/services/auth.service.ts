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

  async login(){
    
  }
}
