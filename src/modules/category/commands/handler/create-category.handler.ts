import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCategoryCommand } from "../impl/create-category.command";
import { Repository } from "typeorm";
import { CategoryEntity } from "../../entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand>{
  constructor(
    @InjectRepository(CategoryEntity)private readonly categoryRepository: Repository<CategoryEntity>
  ){}

  async execute({createCategoryDto}: CreateCategoryCommand) {
    const newCategory = new CategoryEntity({...createCategoryDto});
    const response = await this.categoryRepository.save(newCategory);

    return response;
  }
}