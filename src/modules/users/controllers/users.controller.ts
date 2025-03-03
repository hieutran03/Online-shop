import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ){}

  @Get()
  async findAll(){
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number){
    return this.userService.findById(id)
  }

  @Post()
  async createUser(@Body()createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

  @Patch(':id')
  async changePassword(
    @Param('id') id,
    @Body()updateUserDto: UpdateUserDto
  ){
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number){
    return this.userService.deleteUser(id);
  }

}
