import { ProductIcon } from '@/models/product-icon';
import { AttributeModifier } from '@/types';
import { newID } from '@/utils';
export abstract class Product<T extends Product<T>> {
  public readonly name: string;
  public readonly goldCost: number;
  public icon: ProductIcon;
  public readonly id: string;
  public readonly attributes: AttributeModifier[];

  constructor(
    name: string,
    goldCost: number,
    attributes?: AttributeModifier[],
  ) {
    this.name = name;
    this.goldCost = goldCost;
    this.icon = this.setIcon();
    this.id = newID();
    if (!attributes) this.attributes = [];
    else this.attributes = attributes;

    // console.log(`Item ${this.name} created`);
  }

  abstract setIcon(): ProductIcon;
  public abstract clone(): T;
}
