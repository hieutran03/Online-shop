import { EmailInterface } from "src/common/interfaces/email.interface";

export class ForgotPasswordEvent {
  constructor(
    public readonly email: EmailInterface,
  ) {}
}