import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import InsertCartItemCommand from "../impl/insert-cart-item.command";
import { InjectRepository } from "@nestjs/typeorm";
import CartEntity from "../../entities/cart.entity";
import { Repository } from "typeorm";
import { ProductEntity } from "src/modules/products/entities/product.entity";
import { CartItemEntity } from "../../entities/cart-item.entity";
import { NotFoundException } from "@nestjs/common";
import { CartMapper } from "../../mappers/cart.mapper";

@CommandHandler(InsertCartItemCommand)
export default class InsertCartItemHandler implements ICommandHandler<InsertCartItemCommand> {
  constructor(
    @InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CartItemEntity) private readonly cartItemRepository: Repository<CartItemEntity>,
    private readonly eventPublisher: EventPublisher,
    private readonly cartMapper: CartMapper
  ){}

  async execute({ cartId, productId, quantity }: InsertCartItemCommand) {
    let response;
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
    
    const existingCartItem = await this.cartItemRepository.findOne({
      where: { cartId, productId },
    });
    if(existingCartItem){
      existingCartItem.quantity += quantity;
      response = await this.cartItemRepository.save(existingCartItem);
    }else{
      const cartItem = new CartItemEntity({
        cartId: cart.id,
        productId: productId,
        quantity
      });
      response = await this.cartItemRepository.save(cartItem);
    }
    cart.totalPrice += product.price * quantity;
    const cartEntity = await this.cartRepository.save(cart);
    const cartModel = this.eventPublisher.mergeObjectContext(
      this.cartMapper.mapEntityToModel(cartEntity)
    );
    cartModel.updateCart(response);
    cartModel.commit();
    
    return response
  }
}