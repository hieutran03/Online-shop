import { CartItemEntity } from "../../entities/cart-item.entity";

export class UpdateCartEvent {
    constructor(
      public readonly cartItem: CartItemEntity,
      public readonly totalPrice: number
    ){}
}