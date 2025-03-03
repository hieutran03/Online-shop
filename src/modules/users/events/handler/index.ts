import { ForgotPasswordHander } from "./forgot-password.handler";
import { UserCreatedHandler } from "./user-created.handler";

export const UsersEventHandlers = [UserCreatedHandler, ForgotPasswordHander]