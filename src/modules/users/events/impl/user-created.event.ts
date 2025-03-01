import { EmailInterface } from "src/common/interfaces/email.interface";

export class UserCreatedEvent{
  constructor(
    public readonly email: EmailInterface
  ){}
}