import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindByIdQuery } from "../impl/find-by-id.query";
import { Repository } from "typeorm";
import { UsersEntiy } from "../../entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(FindByIdQuery)
export class FindByIdHandler implements IQueryHandler<FindByIdQuery>{
  constructor(
    @InjectRepository(UsersEntiy) private readonly userRepository: Repository<UsersEntiy>
  ){}
  execute(query: FindByIdQuery) {
    const {id} = query;
    return this.userRepository.findOne({where:{id}});
  }
}