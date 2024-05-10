export class Item {
  name: string;
  goldCost: number;
  icon: string;

  constructor(name: string, goldCost: number, icon: string) {
    this.name = name;
    this.goldCost = goldCost;
    this.icon = 'itemIcons/' + icon + '.png';

    console.log(`Item ${this.name} created`);
  }
}
