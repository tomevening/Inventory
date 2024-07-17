export class ProductIcon {
  public readonly path: string;

  /** Second argument shows if an icon should be bright or dark. Items are bright, recipes are dark */
  public constructor(
    productID: string | number,
    public readonly isBright: boolean,
  ) {
    this.path = `itemIcons/${productID}.jpg`;
  }
}
