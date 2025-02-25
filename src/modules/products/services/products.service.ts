import { Injectable } from '@nestjs/common';
import { QueryFilterDto } from '../dtos/query-options.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { QueryByFilter } from '../queries/impl/query-by-filter.query';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CreateProductCommand } from '../commands/impl/create-product.command';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { UpdateProductCommand } from '../commands/impl/update-product.command';
import { DeleteProductCommand } from '../commands/impl/delete-propduct.command';

@Injectable()
export class ProductsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ){}
  
  findByFilter(queryFilterDto: QueryFilterDto){
    return this.queryBus.execute(new QueryByFilter(queryFilterDto))
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
