import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserByUsernameQuery } from "../impl/user-by-username.query";
import { Repository } from "typeorm";
import { UsersEntiy } from "../../entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(UserByUsernameQuery)
export class UserHandler implements IQueryHandler<UserByUsernameQuery>{
  constructor(
    @InjectRepository(UsersEntiy)private readonly usersRepository: Repository<UsersEntiy>
  ){}
  execute(query: UserByUsernameQuery) {
    const {username} = query;
    return this.usersRepository.findOne({where: {username}});
  }
}