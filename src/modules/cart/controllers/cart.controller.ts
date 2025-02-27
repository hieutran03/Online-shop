import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CartService } from "../services/cart.service";
import { CartItemDto } from "../dtos/cart-item.dto";
import RBACGuard from "src/core/guards/rbac.guard";
import { UserRole } from "src/modules/users/entities/users.entity";

@Controller('cart')
export class CartController{
  constructor(private readonly cartService: CartService){}
  
  @UseGuards(RBACGuard([UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER]))
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @UseGuards(RBACGuard([UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER]))
  @Get(':cartId')
  findById(@Param('cartId')id: number) {
    return this.cartService.findById(id);
  }

  @UseGuards(RBACGuard([UserRole.ADMIN]))
  @Post(':cartId')
  addItemToCart(
    @Param('cartId')cartId: number,
    @Body() {productId, quantity}: CartItemDto
  ) {
    return this.cartService.addItemToCart(cartId, productId, quantity);
  }

  @UseGuards(RBACGuard([UserRole.ADMIN, UserRole.EDITOR]))
  @Patch(':cartId')
  updateCartItem(
    @Param('cartId')cartId: number,
    @Body() {productId, quantity}: CartItemDto
  ) {
    return this.cartService.updateCartItem(cartId, productId, quantity);
  }

  @UseGuards(RBACGuard([UserRole.ADMIN]))
  @Delete(':cartId/product/:productId')
  removeCartItem(
    @Param('cartId')cartId: number,
    @Param('productId')productId: number
  ) {
    return this.cartService.removeCartItem(cartId, productId);
  }
}