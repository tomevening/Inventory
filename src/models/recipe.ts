// Recipes are items that dont't do anything on their own but show how to create more powerful
// artifacts using basic items

import { Item } from '@/models/item';
import { Product } from '@/models/product';
import { ProductIcon } from '@/models/product-icon';
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
    return new ProductIcon(this.name, false); // Recipes icons are darkened
  }

  public clone() {
    return new Recipe(this.parts, this.result, this.goldCost);
  }
}
