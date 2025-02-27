import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EntityManager, Repository } from 'typeorm';
import { CategoryEntity } from '../../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCategoryCommand } from '../impl/update-category.command';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async execute({ categoryId, updateCategoryDto }: UpdateCategoryCommand) {
    let response;
    await this.entityManager.transaction(async (entityManager) => {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) throw new BadRequestException('Invallid category id');
      Object.assign(category, updateCategoryDto);
      response = await entityManager.save(category);
    });
    return response;
  }
}
