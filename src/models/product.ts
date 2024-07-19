import { AttributeModifier } from '@/models';
import { ProductIcon } from '@/models/product-icon';
import { newID } from '@/utils';
/** Product is an abstract class that contains things in common between Item and Recipe.*/

export abstract class Product<T extends Product<T>> {
  public readonly name: string;
  public readonly goldCost: number;
  public readonly icon: ProductIcon;
  public readonly id: string;
  public readonly attributes: AttributeModifier[];

  constructor(
    name: string,
    goldCost: number,
    attributes?: AttributeModifier[],
  ) {
    this.name = name;
    this.goldCost = goldCost;
    this.icon = this.createIcon();
    this.id = newID();
    attributes ? (this.attributes = attributes) : (this.attributes = []);
  }

  public abstract createIcon(): ProductIcon;
  public abstract clone(): T;
  public abstract getAttributeModifiers(): AttributeModifier[];
}

export type ProductAny = Product<any>;
