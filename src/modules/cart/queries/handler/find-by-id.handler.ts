import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindByIdQuery } from "../impl/find-by-id";
import { Repository } from "typeorm";
import CartEntity from "../../entities/cart.entity";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(FindByIdQuery)
export class FindByIdHandler implements IQueryHandler<FindByIdQuery> {
  constructor(@InjectRepository(CartEntity)private readonly repository: Repository<CartEntity>) {}

  async execute({id}: FindByIdQuery) {
    return await this.repository.findOne({
      where: {id},
      relations: ["cartItems", "cartItems.product"]
    });
  }

}