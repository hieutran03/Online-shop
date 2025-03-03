export class ChangePasswordCommand {
  constructor(
    public readonly userId: number,
    public readonly hashedPassword: string
  ) {}
}