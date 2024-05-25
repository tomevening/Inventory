import { ProductIcon } from '@/models/product-icon';
import { newID } from '@/utils';

export abstract class Product {
  public readonly name: string;
  public readonly goldCost: number;
  public icon: ProductIcon;
  public readonly id: string;

  constructor(name: string, goldCost: number) {
    this.name = name;
    this.goldCost = goldCost;
    this.icon = this.setIcon();
    this.id = newID();

    console.log(`Item ${this.name} created`);
  }

  abstract setIcon(): ProductIcon;
  public abstract clone<T extends Product>(): T;
}
