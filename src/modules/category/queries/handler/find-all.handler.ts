import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { FindAllQuery } from "../impl/find-all.query";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../../entities/category.entity";
import { Repository } from "typeorm";

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery>{
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
  ){}

  async execute({}: FindAllQuery){
    return this.categoryRepository.find();
  }
}