import { Item, Recipe } from '@/models';
import { newID } from '@/utils';

export class Shop {
  public readonly name: string;
  public readonly icon: string;
  public readonly items: (Item | Recipe)[];
  public readonly id: string;

  constructor(name: string, items: (Item | Recipe)[]) {
    this.name = name;
    this.items = items;
    this.icon = 'itemIcons/' + name + '.jpg';
    this.id = newID();

    console.log(`Shop ${this.name} created`);
  }
}
