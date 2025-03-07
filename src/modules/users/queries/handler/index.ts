import { FindAllHandler } from "./find-all.handler";
import { FindByIdHandler } from "./find-by-id.handler";
import { FindByUserNameHandler } from "./find-by-username.handler";

export const UsersQueryHandlers = [FindByUserNameHandler, FindByIdHandler, FindAllHandler]