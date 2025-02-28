import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RemoveCartItemCommand } from "../impl/remove-cart-item.command";
import { InjectRepository } from "@nestjs/typeorm";
import CartEntity from "../../entities/cart.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CartMapper } from "../../mappers/cart.mapper";
import { CartItemEntity } from "../../entities/cart-item.entity";

@CommandHandler(RemoveCartItemCommand) 
export class RemoveCartItemHandler implements ICommandHandler<RemoveCartItemCommand>{
  constructor(
    @InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity) private readonly cartItemRepository: Repository<CartItemEntity>,
    private readonly eventPublisher: EventPublisher,
    private readonly cartMapper: CartMapper
  ){}
  async execute({cartId, productId}: RemoveCartItemCommand){
    const cart = await this.cartRepository.findOne({
      where: {id: cartId},
    });
    
    const deleteCartItem = await this.cartItemRepository.findOne({
      where: {cartId, productId},
      relations: ["product"]
    });

    if(!cart){
      throw new NotFoundException('Cart not found');
    }
    if(!deleteCartItem){
      throw new NotFoundException('Cart item not found');
    }
    
    cart.totalPrice -= deleteCartItem.product.price * deleteCartItem.quantity;
    const cartEntity = await this.cartRepository.save(cart);
    const cartModel = this.eventPublisher.mergeObjectContext(
      this.cartMapper.mapEntityToModel(cartEntity)
    );
  
    let response = await this.cartItemRepository.remove(deleteCartItem);
    cartModel.updateCart(new CartItemEntity({cartId, productId, quantity: 0}));
    cartModel.commit();
     
    return response;
  }

}