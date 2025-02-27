import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import InsertCartItemCommand from "../commands/impl/insert-cart-item.command";
import { FindAllQuery } from "../queries/impl/find-all.query";
import { FindByIdQuery } from "../queries/impl/find-by-id";
import { UpdateCartItemCommand } from "../commands/impl/update-cart-item.command";
import { RemoveCartItemCommand } from "../commands/impl/remove-cart-item.command";

@Injectable()
export class CartService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ){}

  async findAll() {
    return this.queryBus.execute(new FindAllQuery());
  }

  async findById(id: number) {
    return this.queryBus.execute(new FindByIdQuery(id));
  }

  async addItemToCart(cartId: number, productId: number, quantity: number) {
    return this.commandBus.execute(new InsertCartItemCommand(cartId, productId, quantity));
  }
  
  async updateCartItem(cartId: number, productId: number, quantity: number) {
    return this.commandBus.execute(new UpdateCartItemCommand(cartId, productId, quantity));
  }

  async removeCartItem(cartId: number, productId: number) {
    return this.commandBus.execute(new RemoveCartItemCommand(cartId, productId));
  }
}