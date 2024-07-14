// Instances of this class are finished items (and not recipes).
import { AttributeModifier } from '@/models';
import { Product } from '@/models/product';
import { ProductIcon } from '@/models/product-icon';

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
    const icon = new ProductIcon(this.name, true); // Items have bright icons, recipes are darkened
    return icon;
  }

  // We buy items by cloning them into player's inventory
  public clone(): Item {
    return new Item(this.name, this.goldCost, this.attributes);
  }
}
