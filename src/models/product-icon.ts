export class ProductIcon {
  public readonly path: string;

  public constructor(
    productID: string | number,
    public readonly brightness: number,
  ) {
    this.path = `itemIcons/${productID}.jpg`;
  }
}
