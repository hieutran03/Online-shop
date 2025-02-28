import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindByIdQuery } from "../impl/find-by-id";
import { Repository } from "typeorm";
import CartEntity from "../../entities/cart.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@QueryHandler(FindByIdQuery)
export class FindByIdHandler implements IQueryHandler<FindByIdQuery> {
  constructor(
    @InjectRepository(CartEntity)private readonly repository: Repository<CartEntity>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async execute({id}: FindByIdQuery) {
    let cart = JSON.parse(await this.cacheManager.get(`cart-${id}`));
    console.log(cart);
    if(!cart){
      cart = await this.repository.findOne({
        where: {id},
        relations: ["cartItems", "cartItems.product"]
      });
      if(cart)
        await this.cacheManager.set(`cart-${id}`, JSON.stringify(cart));
    }
    return cart; 
  }
}