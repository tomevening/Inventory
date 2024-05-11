import { Item } from '@/models';
import { newID } from '@/utils';

export class Shop {
  name: string;
  icon: string;
  items: Item[];
  id: string;

  constructor(name: string, items: Item[]) {
    this.name = name;
    this.items = items;
    this.icon = 'itemIcons/' + name + '.jpg';
    this.id = newID();

    console.log(`Shop ${this.name} created`);
  }
}
