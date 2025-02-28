import { AggregateRoot } from "@nestjs/cqrs";
import { CartItemEntity } from "../entities/cart-item.entity";
import { UpdateCartEvent } from "./impl/update-cart.event";

export default class CartModel extends AggregateRoot{
  constructor(
    private id: number,
    private totalPrice: number,
    private cartItems: CartItemEntity[]
  ){
    super();
  }

  getId(){
    return this.id;
  }

  getTotalPrice(){
    return this.totalPrice;
  }

  getCartItems(){
    return this.cartItems;
  }

  updateCart(cartItem: CartItemEntity){
    this.apply(new UpdateCartEvent(cartItem, this.totalPrice));
  }
}