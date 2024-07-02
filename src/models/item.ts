import { Product } from '@/models/product';
import { ProductIcon } from '@/models/product-icon';
import { AttributeModifier } from '@/types';

export class Item extends Product<Item> {
  constructor(
    name: string,
    goldCost: number,
    attributes?: AttributeModifier[],
  ) {
    super(name, goldCost, attributes);

    console.log(`Item ${this.name} created`);
  }

  setIcon(): ProductIcon {
    const icon = new ProductIcon(this.name, 1);
    return icon;
  }

  public clone(): Item {
    return new Item(this.name, this.goldCost, this.attributes);
  }
}
