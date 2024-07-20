import { AttributeModifier } from '@/models';
import { ProductIcon } from '@/models/product-icon';
import { newId } from '@/utils';
/** Product is an abstract class that contains things in common between Item and Recipe.*/

export abstract class Product<T extends Product<T>> {
  public readonly icon: ProductIcon;

  public constructor(
    public readonly name: string,
    public readonly goldCost: number,
    public readonly attributes: AttributeModifier[] = [],
    public readonly id: string = newId(),
  ) {
    this.icon = this.createIcon();
  }

  public abstract createIcon(): ProductIcon;
  public abstract clone(): T;
  public abstract getAttributeModifiers(): AttributeModifier[];
}

export type ProductAny = Product<any>;
