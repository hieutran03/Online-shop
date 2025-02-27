import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { CreateCategoryCommand } from "../commands/impl/create-category.command";
import { UpdateCategoryDto } from "../dtos/update-category.dto";
import { UpdateCategoryCommand } from "../commands/impl/update-category.command";
import { DeleteCategoryCommand } from "../commands/impl/delete-category.command";
import { FindByIdQuery } from "../queries/impl/find-by-id.query";
import { FindAllQuery } from "../queries/impl/find-all.query";

@Injectable()
export class CategoryService{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ){}

  findAll(){
    return this.queryBus.execute(new FindAllQuery());
  }

  findById(categoryId: number){
    return this.queryBus.execute(new FindByIdQuery(categoryId));
  }

  createCategory(createCategoryDto: CreateCategoryDto){
    return this.commandBus.execute(new CreateCategoryCommand(createCategoryDto));
  }

  updateCategory(categoryId: number, updateCategoryDto: UpdateCategoryDto){
    return this.commandBus.execute(new UpdateCategoryCommand(categoryId, updateCategoryDto));
  }

  deleteCategory(categoryId: number){
    return this.commandBus.execute(new DeleteCategoryCommand(categoryId));
  }
}