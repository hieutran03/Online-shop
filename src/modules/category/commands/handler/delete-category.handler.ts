import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { DeleteCategoryCommand } from '../impl/delete-category.command';
import { CategoryEntity } from '../../entities/category.entity';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand>{
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly entityManager: EntityManager
  ) {}
  async execute({ categoryId }: DeleteCategoryCommand) {
    let response;
    await this.entityManager.transaction(async (entityManager) => {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      
      if (!category) throw new BadRequestException('Invallid category id');
      
      response = await entityManager.softDelete(CategoryEntity, categoryId);
    });
    return response;
  }
}
