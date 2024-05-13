import { Item } from '@/models';
import { newID } from '@/utils';
export class Recipe {
  private name: string;
  private parts: Item[];
  private result: Item;
  private icon: string;
  private goldCost: number;
  public readonly id: string;

  constructor(
    parts: Item[],
    result: Item,
    goldCost: number,
    allRecipes: Recipe[],
  ) {
    this.parts = parts;
    this.result = result;
    this.name = result.name;
    this.icon = 'itemIcons/' + result.name + ' Recipe.jpg';
    this.goldCost = goldCost;
    this.id = newID();

    parts.forEach(part => this.addRecipeToItem(part));
    allRecipes.push(this);
    console.log(`Recipe for ${this.result.name} created`);
  }

  private addRecipeToItem(item: Item): void {
    item.partOfRecipes.push(this);
    console.log(
      `Recipe added. Current recipes for item ${item.name}: ${item.partOfRecipes.values}`,
    );
  }
}
