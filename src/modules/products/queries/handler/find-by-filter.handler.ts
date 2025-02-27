import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { ProductEntity } from "../../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindByFilterQuery } from "../impl/find-by-filter.query";

@QueryHandler(FindByFilterQuery)
export class FindByFilterHandler implements IQueryHandler<FindByFilterQuery>{
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity> 
  ){}

  async execute({queryFilterDto}: FindByFilterQuery) {
    const response = await this.productRepository.find({
      where: queryFilterDto
    });
    return response;
  }
}