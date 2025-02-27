export default class InsertCartItemCommand {
  constructor(
    public readonly cartId: number, 
    public readonly productId: number,
    public readonly quantity: number
  ){}
}