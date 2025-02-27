import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { CreateCategoryDto } from "../dtos/create-category.dto";

@Controller('category')
export class CategoryController{
  constructor(
    private readonly categoryService: CategoryService
  ){}

  @Get()
  findAll(){
    return this.categoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number){
    return this.categoryService.findById(id);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto){
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Patch(':id')
  updateCategory(@Param('id') id: number, @Body() updateCategoryDto: CreateCategoryDto){
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number){
    return this.categoryService.deleteCategory(id);
  }
}