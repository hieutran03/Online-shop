import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteUserCommand } from "../impl/delete-user.command";
import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsersEntiy } from "../../entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(UsersEntiy) private readonly userRepository: Repository<UsersEntiy>,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const { id } = command;
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.softDelete(id);
  }
}