import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { UsersEntiy } from '../entities/users.entity';
// import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { UserByUsernameQuery } from '../queries/impl/user-by-username.query';

@Injectable()
export class UsersService {
  constructor(
    //@InjectRepository(UsersEntiy) private readonly userRepository: Repository<UsersEntiy>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ){}
  async createUser(createUserDto: CreateUserDto){
    // const newUser = new UsersEntiy({
    //   ...createUserDto
    // });
    // const response = await this.userRepository.save(newUser);
    // return response;
    return this.commandBus.execute(new CreateUserCommand(createUserDto)).catch(()=>{console.log('haha')});
  }
  findByUsername(username: string){
    // return this.userRepository.findOne({where: {username}});
    return this.queryBus.execute(new UserByUsernameQuery(username));
  }
}
