import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { Repository } from 'typeorm';
import { UsersEntiy } from '../../entities/users.entity';
import { UsersMapper } from '../../mappers/users.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import CartEntity from 'src/modules/cart/entities/cart.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(UsersEntiy) private readonly usersRepository: Repository<UsersEntiy>,
    @InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>,
    private readonly eventPublisher: EventPublisher,
    private readonly usersMapper: UsersMapper
  ) {}
  async execute({ createUserDto }: CreateUserCommand) {
    const cart = new CartEntity({});
    const newUser = new UsersEntiy({
      ...createUserDto,
      cart
    });
    const userEntity = await this.usersRepository.save(newUser)
    console.log(userEntity)
    // userEntity.cartId = cart.id;
    const user = this.eventPublisher.mergeObjectContext(
      this.usersMapper.mapEntityToModel(userEntity)
    );
    user.createUser();
    user.commit();
    return userEntity;
  }
}
