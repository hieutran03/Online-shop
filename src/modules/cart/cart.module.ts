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
import { CartMapper } from './mappers/cart.mapper';
import { CartEventHandlers } from './events/handler';

@Module({
  providers: [
    CartService,
    CartMapper,
    ...CartQueryHandlers,
    ...CartCommandHandlers,
    ...CartEventHandlers
  ],
  controllers: [CartController],
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CartEntity, CartItemEntity, ProductEntity]),
  ],
  exports: [CartService]
})
export class CartModule {}
