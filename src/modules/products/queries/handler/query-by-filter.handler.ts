import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { ProductEntity } from "../../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryByFilter } from "../impl/query-by-filter.query";

@QueryHandler(QueryByFilter)
export class QueryByFilterHandler implements IQueryHandler<QueryByFilter>{
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity> 
  ){}

  async execute({queryFilterDto}: QueryByFilter) {
    const response = await this.productRepository.find({
      where: queryFilterDto
    });
    return response;
  }
}