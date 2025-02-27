import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindByIdQuery } from "../impl/find-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "../../entities/category.entity";
import { Repository } from "typeorm";

@QueryHandler(FindByIdQuery)
export class FindByIdHandler implements IQueryHandler<FindByIdQuery>{
  constructor(
    @InjectRepository(CategoryEntity)private readonly categoryRepository: Repository<CategoryEntity>
  ){}

  async execute({categoryId}: FindByIdQuery){
    return this.categoryRepository.findOne({where: {id: categoryId}});
  }
}