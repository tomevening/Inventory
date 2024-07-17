import { Item } from '@/models/item';
import { Product } from '@/models/product';
import { ProductIcon } from '@/models/product-icon';
/**
 * Recipes are items that dont't do anything on their own but show how to create more powerful
 * artifacts using basic items
 * */

export class Recipe extends Product<Recipe> {
  public readonly parts: Item[];
  public readonly result: Item;

  constructor(parts: Item[], result: Item, goldCost: number) {
    super(result.name, goldCost);
    this.parts = parts;
    this.result = result;
    console.log(`Recipe for ${this.result.name} created`);
  }

  setIcon(): ProductIcon {
    return new ProductIcon(this.name, false); // False means that an icon should be darkened
  }

  public clone() {
    return new Recipe(this.parts, this.result, this.goldCost);
  }
}
