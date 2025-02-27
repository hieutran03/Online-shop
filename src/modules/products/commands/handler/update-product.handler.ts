import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../impl/update-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { EntityManager, In, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly entityManager: EntityManager,
  ) {}
  async execute({ productId, updateProductDto }: UpdateProductCommand) {
    let response;
    await this.entityManager.transaction(async (entityManager) => {
      const categories = await this.categoryRepository.find({
        where: { id: In(updateProductDto.categories) },
      });
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (!product) throw new BadRequestException('Invallid product id');
      Object.assign(product, {...updateProductDto, categories});
      response = await entityManager.save(product);
    });
    return response;
  }
}
