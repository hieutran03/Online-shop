import { ForgotPasswordHander } from "./forgot-password.handler";
import { ResetPasswordHandler } from "./reset-password.handler";

export const AuthCommandHandler = [ForgotPasswordHander, ResetPasswordHandler]
