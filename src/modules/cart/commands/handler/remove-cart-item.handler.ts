import { CommandHandler } from "@nestjs/cqrs";
import { RemoveCartItemCommand } from "../impl/remove-cart-item.command";
import { InjectRepository } from "@nestjs/typeorm";
import CartEntity from "../../entities/cart.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(RemoveCartItemCommand) 
export class RemoveCartItemHandler{
  constructor(
    @InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>
  ){}
  async execute({cartId, productId}: RemoveCartItemCommand){
    const cart = await this.cartRepository.findOne({
      where: {id: cartId},
    });
    if(!cart){
      throw new NotFoundException('Cart not found');
    }
    // const cartItem = cart.cartItems.find(
    //   (item) => item.productId === productId,
    // );
    // if(!cartItem){
    //   throw new NotFoundException('Cart item not found');
    // }
    // cart.cartItems = cart.cartItems.filter((item) => item.productId !== productId);
    // await this.cartRepository.save(cart);
    // return cart;

    const response = await this.cartRepository.createQueryBuilder()
      .delete()
      .from('cart_item')
      .where('cartId = :cartId', {cartId})
      .andWhere('productId = :productId', {productId})
      .execute();
    return response;
  }

}