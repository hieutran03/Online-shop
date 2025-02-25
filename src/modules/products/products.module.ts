import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductEntity } from './entities/product.entity';
import { ProductEventHandler } from './events/handler';
import { ProductCommandHandler } from './commands/handler';
import { ProductQueryHandler } from './queries/handler';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ...ProductEventHandler,
    ...ProductCommandHandler,
    ...ProductQueryHandler
  ],
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    CqrsModule,
    
  ]
})
export class ProductsModule {}
