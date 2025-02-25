import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindByUsernameQuery } from "../impl/find-by-username.query";
import { Repository } from "typeorm";
import { UsersEntiy } from "../../entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(FindByUsernameQuery)
export class FindByUserNameHandler implements IQueryHandler<FindByUsernameQuery>{
  constructor(
    @InjectRepository(UsersEntiy)private readonly usersRepository: Repository<UsersEntiy>
  ){}
  execute(query: FindByUsernameQuery) {
    const {username} = query;
    return this.usersRepository.findOne({where: {username}});
  }
}