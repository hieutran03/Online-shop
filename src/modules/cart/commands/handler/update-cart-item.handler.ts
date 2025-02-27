import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateCartItemCommand } from "../impl/update-cart-item.command";
import { InjectRepository } from "@nestjs/typeorm";
import CartEntity from "../../entities/cart.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CartItemEntity } from "../../entities/cart-item.entity";


@CommandHandler(UpdateCartItemCommand)
export class UpdateCartItemHandler implements ICommandHandler<UpdateCartItemCommand> {
  constructor(
    @InjectRepository(CartEntity)private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}
  async execute({carrId, productId, quantity}: UpdateCartItemCommand) {
    const cart = await this.cartRepository.findOne({
      where: {id: carrId},
    });
    if(!cart){
      throw new NotFoundException('Cart not found');
    }
    // const cartItem = cart.cartItems.find(
    //   (item) => item.productId === productId,
    // );
    // if (!cartItem) {
    //   throw new NotFoundException('Cart item not found');
    // }
    // cartItem.quantity = quantity;
    // await this.cartRepository.save(cart);
    // return cart;
    const cartItem = await this.cartItemRepository.findOne({
      where: {cartId: carrId, productId},
    });
    if(!cartItem){
      throw new NotFoundException('Cart item not found');
    }
    cartItem.quantity = quantity;
    const response = await this.cartItemRepository.save(cartItem);
    return response;
  }
}
