export class Item {
  name: string;
  goldCost: number;
  icon: string;

  constructor(name: string, goldCost: number) {
    this.name = name;
    this.goldCost = goldCost;
    this.icon = 'itemIcons/' + name + '.jpg';

    console.log(`Item ${this.name} created`);
  }
}
