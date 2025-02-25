import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { QueryFilterDto } from '../dtos/query-options.dto';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import RBACGuard from 'src/core/guards/rbac.guard';
import { UserRole } from 'src/modules/users/entities/users.entity';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService
  ){}

  @Get()
  queryByFilter(@Query() queryFilterDto: QueryFilterDto){
    return this.productService.findByFilter(queryFilterDto);
  }

  @UseGuards(RBACGuard([UserRole.ADMIN]))
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto){
    return this.productService.createProduct(createProductDto)
  }

  @UseGuards(RBACGuard([UserRole.ADMIN, UserRole.EDITOR]))
  @Patch(':productId')
  updateProduct(
    @Param('productId')productId: number,
    @Body() updateProductDto: UpdateProductDto
  ){
    return this.productService.updateProduct(productId, updateProductDto);
  }

  @UseGuards(RBACGuard([UserRole.ADMIN]))
  @Delete(':productId')
  deleteProduct(
    @Param('productId')productId: number
  ){
    return this.productService.deleteProduct(productId);
  }
}
