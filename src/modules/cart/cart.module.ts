import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import CartEntity from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-item.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { CartService } from './services/cart.service';
import { CartQueryHandlers } from './queries/handler';
import { CartCommandHandlers } from './commands/handler';
import { CartController } from './controllers/cart.controller';

@Module({
  providers: [
    CartService,
    ...CartQueryHandlers,
    ...CartCommandHandlers
  ],
  controllers: [CartController],
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CartEntity, CartItemEntity, ProductEntity]),
  ],
  exports: [CartService]
})
export class CartModule {}
