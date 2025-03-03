import { CommandBus, CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { ForgotPasswordCommand } from "../impl/forgot-password.command";
import { ChangePasswordCommand } from "src/modules/users/commands/impl/change-passowod.command";
import { UsersMapper } from "src/modules/users/mappers/users.mapper";

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHander implements ICommandHandler<ForgotPasswordCommand>{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly usersMapper: UsersMapper,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute({userId, hashedPassword, newPasssword}: ForgotPasswordCommand){
    const usersEntiy = await this.commandBus.execute(new ChangePasswordCommand(userId, hashedPassword));
    
    const user = this.eventPublisher.mergeObjectContext(
      this.usersMapper.mapEntityToModel(usersEntiy)
    )
    user.changePassword(newPasssword);
    user.commit();
  }
}