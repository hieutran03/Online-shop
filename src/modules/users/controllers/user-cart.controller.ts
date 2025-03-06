import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { RequestWithUser } from "src/common/interfaces/request-with-user.interface";
import JwtAuthGuard from "src/core/guards/jwt-auth.guard";
import { CartItemDto } from "src/modules/cart/dtos/cart-item.dto";
import { CartService } from "src/modules/cart/services/cart.service";

@Controller('my-cart')
export class UserCartController{
  constructor(private readonly cartService: CartService){}
 
  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @UseGuards(JwtAuthGuard)
  @Get()
  getCart(@Req() requestWithUser: RequestWithUser){
    const {user} = requestWithUser;
    return this.cartService.findById(user.cartId);
  }

  @ApiResponse({ status: 201, description: 'Created'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @UseGuards(JwtAuthGuard)
  @Post()
  addItemToCart(
    @Req() requestWithUser: RequestWithUser,
    @Body() {productId, quantity}: CartItemDto
  ) {
    const {user} = requestWithUser;
    const cartId = user.cartId;
    return this.cartService.addItemToCart(cartId, productId, quantity);
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateCartItem(
    @Req() requestWithUser: RequestWithUser,
    @Body() {productId, quantity}: CartItemDto
  ) {
    const {user} = requestWithUser;
    const cartId = user.cartId;
    return this.cartService.updateCartItem(cartId, productId, quantity);
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseGuards(JwtAuthGuard)
  @Delete('/product/:productId')
  removeCartItem(
    @Req() requestWithUser: RequestWithUser,
    @Param('productId')productId: number
  ) {
    const {user} = requestWithUser;
    const cartId = user.cartId;
    return this.cartService.removeCartItem(cartId, productId);
  }
}