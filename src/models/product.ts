import { AttributeModifier } from '@/models';
import { newId } from '@/utils';
/** Product is an abstract class that contains things in common between Item and Recipe.*/

export abstract class Product<T extends Product<T>> {
  public readonly icon: string;

  public constructor(
    public readonly name: string,
    public readonly goldCost: number,
    public readonly attributes: AttributeModifier[] = [],
    public readonly id: string = newId(),
  ) {
    this.icon = `itemIcons/${name}.jpg`;
  }

  public abstract clone(): T;
  public abstract getAttributeModifiers(): AttributeModifier[];
}

export type ProductAny = Product<any>;
