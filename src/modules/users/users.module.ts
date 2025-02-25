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

@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([UsersEntiy]),
    CqrsModule
  ],
  providers: [
    UsersService,
    UsersMapper,
    ...UsersEventHandlers,
    ...UsersQueryHandlers,
    ...UsersCommandHandlers, 
  ],
  exports: [UsersService]
})
export class UsersModule {}
