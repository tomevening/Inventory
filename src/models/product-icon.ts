export class ProductIcon {
  public readonly path: string;

  public constructor(
    productID: string | number,
    public readonly isBright: boolean,
  ) {
    this.path = `itemIcons/${productID}.jpg`;
  }
}
