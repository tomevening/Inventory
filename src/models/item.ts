import { Product } from '@/models/product';
import { ProductIcon } from '@/models/product-icon';
export class Item extends Product {
  constructor(name: string, goldCost: number) {
    super(name, goldCost);

    console.log(`Item ${this.name} created`);
  }

  setIcon(): ProductIcon {
    const icon = new ProductIcon(this.name, 1);
    return icon;
  }

  public clone<T extends Product>(): T {
    return new Item(this.name, this.goldCost) as T;
  }
}
