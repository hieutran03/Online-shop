import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllQuery } from "../impl/find-all.query";
import { InjectRepository } from "@nestjs/typeorm";
import CartEntity from "../../entities/cart.entity";
import { Repository } from "typeorm";

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery>{
  constructor(
    @InjectRepository(CartEntity) private readonly repository: Repository<CartEntity>
  ) {}

  async execute(query: FindAllQuery) {
    return await this.repository.find({
      relations: ["user"]
    });
  }
}