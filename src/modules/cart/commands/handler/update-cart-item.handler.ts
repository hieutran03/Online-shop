import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateCartItemCommand } from "../impl/update-cart-item.command";
import { InjectRepository } from "@nestjs/typeorm";
import CartEntity from "../../entities/cart.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CartItemEntity } from "../../entities/cart-item.entity";
import { CartMapper } from "../../mappers/cart.mapper";


@CommandHandler(UpdateCartItemCommand)
export class UpdateCartItemHandler implements ICommandHandler<UpdateCartItemCommand> {
  constructor(
    @InjectRepository(CartEntity)private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)private readonly cartItemRepository: Repository<CartItemEntity>,
    private readonly eventPublisher: EventPublisher,
    private readonly cartMapper: CartMapper
  ) {}
  async execute({carrId, productId, quantity}: UpdateCartItemCommand) {
    const cart = await this.cartRepository.findOne({
      where: {id: carrId},
    });
    if(!cart){
      throw new NotFoundException('Cart not found');
    }
   
    const cartItem = await this.cartItemRepository.findOne({
      where: {cartId: carrId, productId},
      relations: ["product"]
    });
    if(!cartItem){
      throw new NotFoundException('Cart item not found');
    }

    cart.totalPrice += cartItem.product.price * (quantity - cartItem.quantity);
    const cartEntity = await this.cartRepository.save(cart);

    cartItem.quantity = quantity;
    let response = await this.cartItemRepository.save(cartItem);

    const cartModel = this.eventPublisher.mergeObjectContext(
      this.cartMapper.mapEntityToModel(cartEntity)
    );
    cartModel.updateCart(response);
    cartModel.commit();

    return response;
  }
}
