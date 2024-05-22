import { Product } from '@/models/product';
import { ProductIcon } from '@/models/product-icon';

export class Item extends Product {
  // public readonly name: string;
  // public readonly goldCost: number;
  // public readonly icon: string;
  // public readonly id: string;
  // public partOfRecipes: Recipe[];

  constructor(name: string, goldCost: number) {
    super(name, goldCost);
    // this.name = name;
    // this.goldCost = goldCost;
    // this.icon = 'itemIcons/' + name + '.jpg';
    // this.id = newID();
    // this.partOfRecipes = new Array<Recipe>();

    console.log(`Item ${this.name} created`);
  }

  setIcon(): ProductIcon {
    const icon = new ProductIcon(this.name, 255);
    return icon;
  }
}
