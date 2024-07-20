import { ProductAny } from '@/models';
import { newId } from '@/utils';

export class Shop {
  public readonly name: string;
  public readonly icon: string;
  public readonly items: ProductAny[];
  public readonly id: string;

  public constructor(name: string, items: ProductAny[]) {
    this.name = name;
    this.items = items;
    this.icon = 'itemIcons/' + name + '.jpg';
    this.id = newId();

    console.log(`Shop ${this.name} created`);
  }
}
