import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../impl/delete-product.command';
import { EntityManager, Repository } from 'typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    private readonly entityManager: EntityManager
  ) {}
  async execute({ productId }: DeleteProductCommand) {
    let response;
    await this.entityManager.transaction(async (entityManager) => {
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      
      if (!product) throw new BadRequestException('Invallid product id');
      
      response = await entityManager.softDelete(ProductEntity, productId);
    });
    return response;
  }
}
