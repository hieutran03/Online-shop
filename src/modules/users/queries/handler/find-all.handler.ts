import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllQuery } from "../impl/find-all.query";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntiy } from "../../entities/users.entity";
import { Repository } from "typeorm";

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery>{
  constructor(
    @InjectRepository(UsersEntiy) private readonly userRepository: Repository<UsersEntiy>
  ){}
  async execute(query: FindAllQuery): Promise<any> {
    return this.userRepository.find();
  }
}