import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { CategoryQueryHandlers } from './queries/handler';
import { CategoryCommandHandler } from './commands/handler';
import { CategoryEntity } from './entities/category.entity';

@Module({
  providers: [ 
    ...CategoryQueryHandlers,
    ...CategoryCommandHandler,
    CategoryService
  ],
  controllers: [CategoryController],
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CategoryEntity])
  ]
})
export class CategoryModule {}
