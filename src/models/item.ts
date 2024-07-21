import { AttributeModifier } from '@/models';
import { Product } from '@/models/product';
/** Instances of this class are finished items (and not recipes). */

export class Item extends Product<Item> {
  public constructor(
    name: string,
    goldCost: number,
    attributes?: AttributeModifier[],
  ) {
    super(name, goldCost, attributes);
    console.log(`Item ${this.name} created`);
  }

  //  We buy items by cloning them into player's inventory
  public clone(): Item {
    return new Item(this.name, this.goldCost, this.attributes);
  }

  public getAttributeModifiers(): AttributeModifier[] {
    return this.attributes;
  }
}
