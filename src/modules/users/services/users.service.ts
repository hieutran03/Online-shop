import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { UsersEntiy } from '../entities/users.entity';
// import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { FindByUsernameQuery } from '../queries/impl/find-by-username.query';
import { FindByIdQuery } from '../queries/impl/find-by-id.query';
import { FindAllQuery } from '../queries/impl/find-all.query';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserCommand } from '../commands/impl/update-user.command';
import { DeleteUserCommand } from '../commands/impl/delete-user.command';

@Injectable()
export class UsersService {
  constructor(
    //@InjectRepository(UsersEntiy) private readonly userRepository: Repository<UsersEntiy>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ){}
  async findAll(){
    return this.queryBus.execute(new FindAllQuery())
  }
  async createUser(createUserDto: CreateUserDto){
    // const newUser = new UsersEntiy({
    //   ...createUserDto
    // });
    // const response = await this.userRepository.save(newUser);
    // return response;
    return this.commandBus.execute(new CreateUserCommand(createUserDto)).catch((e)=>{console.log(e)});
  }
  findByUsername(username: string){
    // return this.userRepository.findOne({where: {username}});
    return this.queryBus.execute(new FindByUsernameQuery(username));
  }

  findById(id: number){
    return this.queryBus.execute(new FindByIdQuery(id));
  }

  updateUser(id: number, updateUserDto: UpdateUserDto){
    return this.commandBus.execute(new UpdateUserCommand(id, updateUserDto));
  }

  deleteUser(id: number){
    return this.commandBus.execute(new DeleteUserCommand(id));
  }
  // changePassword(id: number, newPassword: string){
  //   return this.commandBus.execute(new ChangePasswordCommand(id, newPassword));
  // }
}
