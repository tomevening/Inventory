import { Item } from '@/models/item';
import { Product } from '@/models/product';
import { ProductIcon } from '@/models/product-icon';
export class Recipe extends Product {
  private parts: Item[];
  private result: Item;

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
}
