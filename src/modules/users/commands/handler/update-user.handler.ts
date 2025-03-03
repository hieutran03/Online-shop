import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "../impl/update-user.command";
import { Repository } from "typeorm";
import { UsersEntiy } from "../../entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand>{
  constructor(
    @InjectRepository(UsersEntiy) private readonly userRepository: Repository<UsersEntiy>
  ){}

  async execute({updateUserDto, id}: UpdateUserCommand) {
    const user = await this.userRepository.findOne({where: {id}});
    if(!user){
      throw new Error("User not found");
    }
    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto
    });
    return updatedUser;
  }

}