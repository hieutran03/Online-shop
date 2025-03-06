import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CartItemDto } from '../dtos/cart-item.dto';
import RBACGuard from 'src/core/guards/rbac.guard';
import { UserRole } from 'src/modules/users/entities/users.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiResponse({ status: 200, description: 'Success' })
  @UseGuards(RBACGuard([UserRole.ADMIN, UserRole.EDITOR]))
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 403, description: 'Forbidden'})
  @UseGuards(RBACGuard([UserRole.ADMIN, UserRole.EDITOR]))
  @Get(':cartId')
  findById(@Param('cartId') id: number) {
    return this.cartService.findById(id);
  }

  @ApiResponse({ status: 201, description: 'Created'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 403, description: 'Forbidden'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseGuards(RBACGuard([UserRole.ADMIN]))
  @Post(':cartId')
  addItemToCart(
    @Param('cartId') cartId: number,
    @Body() { productId, quantity }: CartItemDto,
  ) {
    return this.cartService.addItemToCart(cartId, productId, quantity);
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 403, description: 'Forbidden'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseGuards(RBACGuard([UserRole.ADMIN, UserRole.EDITOR]))
  @Patch(':cartId')
  updateCartItem(
    @Param('cartId') cartId: number,
    @Body() { productId, quantity }: CartItemDto,
  ) {
    return this.cartService.updateCartItem(cartId, productId, quantity);
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 403, description: 'Forbidden'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseGuards(RBACGuard([UserRole.ADMIN]))
  @Delete(':cartId/product/:productId')
  removeCartItem(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ) {
    return this.cartService.removeCartItem(cartId, productId);
  }
}
