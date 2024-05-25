import { Item } from '@/models/item';
import { Product } from '@/models/product';
import { ProductIcon } from '@/models/product-icon';
export class Recipe extends Product {
  public readonly parts: Item[];
  public readonly result: Item;

  constructor(parts: Item[], result: Item, goldCost: number) {
    super(result.name, goldCost);
    this.parts = parts;
    this.result = result;
    console.log(`Recipe for ${this.result.name} created`);
  }

  setIcon(): ProductIcon {
    const icon = new ProductIcon(this.name, 0);
    return icon;
  }

  public clone<T extends Product>(): T {
    return new Recipe(this.parts, this.result, this.goldCost) as unknown as T;
  }

  // public clone() {
  //   return new Recipe(this.parts, this.result, this.goldCost);
  // }
}
