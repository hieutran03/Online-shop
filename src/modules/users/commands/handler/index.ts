import { ChangePasswordHandler } from "./change-password.handler";
import { CreateUserHandler } from "./create-user.handler";
import { UpdateUserHandler } from "./update-user.handler";

export const UsersCommandHandlers = [CreateUserHandler, ChangePasswordHandler, UpdateUserHandler]