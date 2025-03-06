import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { ApiResponse } from "@nestjs/swagger";
import RBACGuard from "src/core/guards/rbac.guard";
import { UserRole } from "src/modules/users/entities/users.entity";

@Controller('category')
export class CategoryController{
  constructor(
    private readonly categoryService: CategoryService
  ){}

  @ApiResponse({ status: 200, description: 'Success'})
  @Get()
  findAll(){
    return this.categoryService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @Get(':id')
  findById(@Param('id') id: number){
    return this.categoryService.findById(id);
  }

  @ApiResponse({ status: 201, description: 'Created'})
  @ApiResponse({ status: 500, description: 'Bad Request'})
  @UseGuards(RBACGuard([UserRole.ADMIN]))
  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto){
    return this.categoryService.createCategory(createCategoryDto);
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 403, description: 'Forbidden'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseGuards(RBACGuard([UserRole.ADMIN, UserRole.EDITOR]))
  @Patch(':id')
  updateCategory(@Param('id') id: number, @Body() updateCategoryDto: CreateCategoryDto){
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  @ApiResponse({status: 403, description: 'Forbidden'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseGuards(RBACGuard([UserRole.ADMIN]))
  @Delete(':id')
  deleteCategory(@Param('id') id: number){
    return this.categoryService.deleteCategory(id);
  }
}