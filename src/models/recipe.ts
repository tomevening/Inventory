import { Item } from '@/models';

export class Recipe {
  private name: string;
  private parts: Item[];
  private result: Item;

  constructor(parts: Item[], result: Item) {
    this.parts = parts;
    this.result = result;
    this.name = result.name;

    parts.forEach(part => this.addRecipeToItem(part));

    console.log(`Recipe for ${this.result.name} created`);
  }

  private addRecipeToItem(item: Item): void {
    item.partOfRecipes.push(this);
    console.log(
      `Recipe added. Current recipes for item ${item.name}: ${item.partOfRecipes.values}`,
    );
  }
}
