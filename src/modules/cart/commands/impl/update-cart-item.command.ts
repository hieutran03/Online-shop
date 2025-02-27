export class UpdateCartItemCommand {
  constructor(
    public readonly carrId: number, 
    public readonly productId: number,
    public readonly quantity: number
  ){}
}