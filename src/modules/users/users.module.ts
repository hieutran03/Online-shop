import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntiy } from './entities/users.entity';
import { UsersMapper } from './mappers/users.mapper';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersEventHandlers } from './events/handler';
import { UsersQueryHandlers } from './queries/handler';
import { UsersCommandHandlers } from './commands/handler';
import { HttpExceptionFilter } from 'src/core/filters/http-exeption.filter';
import CartEntity from '../cart/entities/cart.entity';
import { CartModule } from '../cart/cart.module';
import { UserCartController } from './controllers/user-cart.controller';
import { QueueModule } from '../queue/queue.module';

@Module({
  controllers: [UsersController, UserCartController],
  imports: [
    TypeOrmModule.forFeature([UsersEntiy, CartEntity]),
    CqrsModule,
    CartModule,
    QueueModule,
  ],
  providers: [
    UsersService,
    UsersMapper,
    ...UsersEventHandlers,
    ...UsersQueryHandlers,
    ...UsersCommandHandlers, 
  ],
  exports: [UsersService, UsersMapper]
})
export class UsersModule {}
