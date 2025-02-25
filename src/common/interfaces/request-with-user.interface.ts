import{ Request } from 'express';
import { UsersEntiy } from 'src/modules/users/entities/users.entity';
export interface RequestWithUser extends Request {
  user: UsersEntiy;
}