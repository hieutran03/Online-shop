import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import InsertCartItemCommand from "../impl/insert-cart-item.command";
import { InjectRepository } from "@nestjs/typeorm";
import CartEntity from "../../entities/cart.entity";
import { Repository } from "typeorm";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { CartItemEntity } from "../../entities/cart-item.entity";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(InsertCartItemCommand)
export default class InsertCartItemHandler implements ICommandHandler<InsertCartItemCommand> {
  constructor(
    @InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CartItemEntity) private readonly cartItemRepository: Repository<CartItemEntity>
  ){}

  async execute({ cartId, productId, quantity }: InsertCartItemCommand) {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
    });
    if(!cart){
      throw new NotFoundException('Cart not found');
    }

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if(!product){
      throw new NotFoundException('Product not found');
    }

    const cartItem = new CartItemEntity({
      cartId: cart.id,
      productId: productId,
      quantity
    });
    const response = await this.cartItemRepository.save(cartItem);
    return response
  }
}