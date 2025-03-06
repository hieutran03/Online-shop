import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRole } from '../entities/users.entity';
import RBACGuard from 'src/core/guards/rbac.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ){}

  @ApiResponse({ status: 200, description: 'Success'})
  @UseGuards(RBACGuard([UserRole.ADMIN, UserRole.EDITOR]))
  @Get()
  async findAll(){
    return this.userService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseGuards(RBACGuard([UserRole.ADMIN, UserRole.EDITOR]))
  @Get(':id')
  async findById(@Param('id') id: number){
    return this.userService.findById(id)
  }

  @ApiResponse({ status: 201, description: 'Created'})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @UseGuards(RBACGuard([UserRole.ADMIN])) 
  @Post()
  async createUser(@Body()createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseGuards(RBACGuard([UserRole.ADMIN, UserRole.EDITOR]))
  @Patch(':id')
  async changePassword(
    @Param('id') id,
    @Body()updateUserDto: UpdateUserDto
  ){
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  @UseGuards(RBACGuard([UserRole.ADMIN]))
  @Delete(':id')
  async deleteUser(@Param('id') id: number){
    return this.userService.deleteUser(id);
  }

}
