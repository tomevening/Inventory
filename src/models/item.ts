import { Recipe } from '@/models';
import { newID } from '@/utils';

export class Item {
  public readonly name: string;
  public readonly goldCost: number;
  public readonly icon: string;
  public readonly id: string;
  public partOfRecipes: Recipe[];

  constructor(name: string, goldCost: number) {
    this.name = name;
    this.goldCost = goldCost;
    this.icon = 'itemIcons/' + name + '.jpg';
    this.id = newID();
    this.partOfRecipes = new Array<Recipe>();

    console.log(`Item ${this.name} created`);
  }
}
