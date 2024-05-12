import { Item } from '@/models';

export class Recipe {
  private name: string;
  private parts: Item[];
  private result: Item;
  private icon: string;
  private goldCost: number;

  constructor(parts: Item[], result: Item, goldCost: number) {
    this.parts = parts;
    this.result = result;
    this.name = result.name;
    this.icon = 'itemIcons/' + result.name + ' Recipe.jpg';
    this.goldCost = goldCost;

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
