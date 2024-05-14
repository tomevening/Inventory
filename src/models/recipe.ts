import { Item, Product } from '@/models';
export class Recipe extends Product {
  // private name: string;
  // private goldCost: number;
  // private icon: string;
  // public readonly id: string;
  private parts: Item[];
  private result: Item;

  constructor(
    parts: Item[],
    result: Item,
    goldCost: number,
    // allRecipes: Recipe[],
  ) {
    super(result.name, goldCost);
    this.parts = parts;
    this.result = result;
    // this.name = result.name;
    // this.icon = 'itemIcons/' + result.name + ' Recipe.jpg';
    // this.goldCost = goldCost;
    // this.id = newID();

    // parts.forEach(part => this.addRecipeToItem(part));
    // allRecipes.push(this);
    console.log(`Recipe for ${this.result.name} created`);
  }

  // private addRecipeToItem(item: Item): void {
  //   item.partOfRecipes.push(this);
  //   console.log(
  //     `Recipe added. Current recipes for item ${item.name}: ${item.partOfRecipes.values}`,
  //   );
  // }

  setIcon(): string {
    return '';
  }
}
