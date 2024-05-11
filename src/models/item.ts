import { newID } from '@/utils';

export class Item {
  name: string;
  goldCost: number;
  icon: string;
  id: string;

  constructor(name: string, goldCost: number) {
    this.name = name;
    this.goldCost = goldCost;
    this.icon = 'itemIcons/' + name + '.jpg';
    this.id = newID();

    console.log(`Item ${this.name} created`);
  }
}
