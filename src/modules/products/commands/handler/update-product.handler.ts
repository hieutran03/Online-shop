import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../impl/update-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { EntityManager, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    private readonly entityManager: EntityManager,
  ) {}
  async execute({ productId, updateProductDto }: UpdateProductCommand) {
    let response;
    await this.entityManager.transaction(async(entityManager)=>{
      const product = await this.productRepository.findOne({where: {id: productId}});
      if(!product)
        throw new BadRequestException("Invallid product id");
      Object.assign(product, updateProductDto);
      response = await entityManager.save(product);
    })
    return response;
  }
}
