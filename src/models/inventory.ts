import { shallowReactive } from 'vue';
import { ProductAny, Recipe } from '.';

export class Inventory {
  public constructor(
    public readonly maxLength: number,
    public readonly items = shallowReactive<ProductAny[]>([]),
  ) {}

  // /** Creates reactive instances of this class */
  // public static create(
  //   maxLength: number,
  //   items = shallowReactive<ProductAny[]>([]),
  // ) {
  //   return reactive(new Inventory(maxLength, items));
  // }

  public addItem(product: ProductAny) {
    this.items.push(product.clone());
    this.checkRecipes();
  }

  /**  Checking if we have any recipes */
  private checkRecipes() {
    const recipies = this.items.filter(
      (product): product is Recipe => product instanceof Recipe,
    );
    const productNames = this.items.map(product => product.name);
    for (const recipe of recipies) {
      console.log('Recipe found');
      this.tryAssemblingItem(recipe, productNames);
    }
  }

  /**  Checking if we have all the parts for any of the multi-parts items */
  private tryAssemblingItem(recipe: Recipe, productNames: string[]) {
    const allPartPresent = recipe.parts.every(part =>
      productNames.includes(part.name),
    );

    if (!allPartPresent) return;

    console.log(`Finished recipe found: ${recipe.name}. Combining...`);
    for (const part of recipe.parts) {
      this.removeItemByName(part.name);
    }
    this.addItem(recipe.result);
    this.removeItem(recipe);
  }

  public removeItem(product: ProductAny) {
    const itemIndex = this.items.indexOf(product);
    if (itemIndex === -1) {
      console.log('Item not found');
      return;
    }
    this.items.splice(itemIndex, 1);
  }

  public removeItemByName(productName: string) {
    const item = this.items.find(product => product.name === productName);
    if (!item) return;
    this.removeItem(item);
  }
}
