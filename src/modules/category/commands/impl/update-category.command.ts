import { UpdateCategoryDto } from "../../dtos/update-category.dto";

export class UpdateCategoryCommand{
  constructor(
    public readonly categoryId: number,
    public readonly updateCategoryDto: UpdateCategoryDto
  ){}
}