import { ProductAny } from '@/models';
import { newID } from '@/utils';

export class Shop {
  public readonly name: string;
  public readonly icon: string;
  public readonly items: ProductAny[];
  public readonly id: string;

  constructor(name: string, items: ProductAny[]) {
    this.name = name;
    this.items = items;
    this.icon = 'itemIcons/' + name + '.jpg';
    this.id = newID();

    console.log(`Shop ${this.name} created`);
  }
}
