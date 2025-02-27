import { Injectable } from '@nestjs/common';
import { QueryFilterDto } from '../dtos/query-options.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindByFilterQuery } from '../queries/impl/find-by-filter.query';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CreateProductCommand } from '../commands/impl/create-product.command';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { UpdateProductCommand } from '../commands/impl/update-product.command';
import { DeleteProductCommand } from '../commands/impl/delete-propduct.command';
import { FindByIdHandler } from '../queries/handler/find-by-id.handler';
import { FindByIdQuery } from '../queries/impl/find-by-id.query';

@Injectable()
export class ProductsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ){}
  
  findById(productId: number){
    return this.queryBus.execute(new FindByIdQuery(productId));
  }

  findByFilter(queryFilterDto: QueryFilterDto){
    return this.queryBus.execute(new FindByFilterQuery(queryFilterDto))
  }

  createProduct(createProductDto: CreateProductDto){
    return this.commandBus.execute(new CreateProductCommand(createProductDto));
  }

  updateProduct(productId: number, updateProductDto: UpdateProductDto){
    return this.commandBus.execute(new UpdateProductCommand(productId, updateProductDto));
  }

  deleteProduct(productId: number){
    return this.commandBus.execute(new DeleteProductCommand(productId))
  }
}
