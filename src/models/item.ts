import { Product } from '@/models/product';
import { ProductIcon } from '@/models/product-icon';
import { AttributeModifier } from '@/types';

export class Item extends Product<Item> {
  public readonly modifiers: AttributeModifier[];

  constructor(name: string, goldCost: number, modifiers?: AttributeModifier[]) {
    super(name, goldCost);

    modifiers ? (this.modifiers = modifiers) : (this.modifiers = []);

    console.log(`Item ${this.name} created`);
  }

  setIcon(): ProductIcon {
    const icon = new ProductIcon(this.name, 1);
    return icon;
  }

  public clone(): Item {
    return new Item(this.name, this.goldCost);
  }
}
