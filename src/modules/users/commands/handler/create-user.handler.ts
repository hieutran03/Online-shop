import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { Repository } from 'typeorm';
import { UsersEntiy } from '../../entities/users.entity';
import { UsersMapper } from '../../users.mapper';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(UsersEntiy) private readonly usersRepository: Repository<UsersEntiy>,
    private readonly eventPublisher: EventPublisher,
    private readonly usersMapper: UsersMapper
  ) {}
  async execute({ createUserDto }: CreateUserCommand) {
    const newUser = new UsersEntiy({
      ...createUserDto,
    });
    const userEntity = await this.usersRepository.save(newUser)
    const user = this.eventPublisher.mergeObjectContext(
      this.usersMapper.mapEntityToModel(userEntity)
    );
    user.createUser();
    user.commit();
    return userEntity;
  }
}
