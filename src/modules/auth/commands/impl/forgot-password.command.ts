export class ForgotPasswordCommand {
  constructor(
    public readonly userId: number,
    public readonly newPasssword: string,
    public readonly hashedPassword: string
  ) {}
}