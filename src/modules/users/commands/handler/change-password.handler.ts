import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ChangePasswordCommand } from "../impl/change-passowod.command";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntiy } from "../../entities/users.entity";
import { Repository } from "typeorm";

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand>{
  constructor(
    @InjectRepository(UsersEntiy) private readonly userRepository: Repository<UsersEntiy>
  ) {}
  async execute({userId, hashedPassword}: ChangePasswordCommand){
    const user = await this.userRepository.findOne({where: {id: userId}});
    if(!user){
      throw new Error('User not found');
    }
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

}