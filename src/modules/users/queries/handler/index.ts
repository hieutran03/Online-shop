import { FindAllHandler } from "src/modules/cart/queries/handler/find-all.handler";
import { FindByIdHandler } from "./find-by-id.handler";
import { FindByUserNameHandler } from "./find-by-username.handler";

export const UsersQueryHandlers = [FindByUserNameHandler, FindByIdHandler, FindAllHandler]