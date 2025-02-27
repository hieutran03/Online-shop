import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindByIdQuery } from "../impl/find-by-id.query";
import { Repository } from "typeorm";
import { ProductEntity } from "../../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(FindByIdQuery)
export class FindByIdHandler implements IQueryHandler<FindByIdQuery>{
  constructor(
    @InjectRepository(ProductEntity)private readonly productRepository: Repository<ProductEntity>
  ){}
  async execute({productId}: FindByIdQuery) {
    const response = await this.productRepository.findOne({
      where: {id: productId},
      relations: ['categories']
    })
    return response
  }
}