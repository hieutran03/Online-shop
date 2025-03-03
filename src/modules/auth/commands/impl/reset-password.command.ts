export class ResetPasswordCommand{
  constructor(
    public readonly userId: number,
    public readonly hashedPassword: string,
  ){}
}