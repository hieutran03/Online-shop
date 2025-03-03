import { CommandBus, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ResetPasswordCommand } from "../impl/reset-password.command";
import { ChangePasswordCommand } from "src/modules/users/commands/impl/change-passowod.command";

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler implements ICommandHandler<ResetPasswordCommand>{
  constructor(
    private readonly commandBus: CommandBus,
  ){}
  
  async execute({userId, hashedPassword}: ResetPasswordCommand){
    return this.commandBus.execute(new ChangePasswordCommand(userId, hashedPassword))
  }
}