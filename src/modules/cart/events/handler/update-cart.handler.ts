import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UpdateCartEvent } from "../impl/update-cart.event";
import { Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItemEntity } from "../../entities/cart-item.entity";
import { Repository } from "typeorm";

@EventsHandler(UpdateCartEvent)
export class UpdateCartHander implements IEventHandler<UpdateCartEvent>{
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(CartItemEntity) private readonly cartItemRepository: Repository<CartItemEntity>
  ){}
  async handle({cartItem, totalPrice}: UpdateCartEvent){
    let cart = JSON.parse(await this.cacheManager.get(`cart-${cartItem.cartId}`));
    if(!cart){
      cart = {
        cartItems: [],
        totalPrice: 0
      } 
    }

    const newCartItem = await this.cartItemRepository.findOne({
      where: {cartId: cartItem.cartId, productId: cartItem.productId},
      relations: ["product"]
    });

    if(cartItem.quantity === 0){
      cart.cartItems = cart.cartItems.filter((item) => item.productId !== +cartItem.productId);
    }else{
      const item = cart.cartItems.find((item) => item.productId === cartItem.productId);
      if(item){
        item.quantity = cartItem.quantity;
      }else{
        cart.cartItems.push(newCartItem);
      }
    }

    cart.totalPrice = totalPrice;
    await this.cacheManager.set(`cart-${cartItem.cartId}`, JSON.stringify(cart));
  }
}