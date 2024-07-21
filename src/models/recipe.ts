import { Item } from '@/models/item';
import { Product } from '@/models/product';
import { AttributeModifier } from '.';
/**
 * Recipes are items that dont't do anything on their own but show how to create more powerful
 * artifacts using basic items
 * */

export class Recipe extends Product<Recipe> {
  public constructor(
    public readonly parts: Item[],
    public readonly result: Item,
    goldCost: number,
  ) {
    super(result.name, goldCost);
    console.log(`Recipe for ${this.result.name} created`);
  }

  public clone() {
    return new Recipe(this.parts, this.result, this.goldCost);
  }

  public getAttributeModifiers(): AttributeModifier[] {
    return this.result.attributes;
  }
}
