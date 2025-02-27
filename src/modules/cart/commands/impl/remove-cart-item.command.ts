export class RemoveCartItemCommand {
  constructor(
    public readonly cartId: number,
    public readonly productId: number
  ){}
}