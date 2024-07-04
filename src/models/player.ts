// import { AttributeModifier } from '@/types';
import { shallowReactive } from 'vue';
import { AttributeModifier, Item, Product, Recipe } from '.';

export class Player {
  public readonly inventory = shallowReactive<Product<Item | Recipe>[]>([]);

  private constructor() {}

  public get currentModifiers() {
    const modifiers: AttributeModifier[] = [];
    for (const item of this.inventory) {
      modifiers.push(...item.attributes);
    }
    return shallowReactive(modifiers);
  }

  public static create() {
    return shallowReactive(new Player());
  }
}

// export class Player {
//   public readonly inventory;
//   public readonly currentModifiers;

//   private constructor() {
//     this.inventory = shallowReactive<Product<Item | Recipe>[]>([]);

//     this.currentModifiers = computed(() => {
//       const modifiers = shallowReactive<AttributeModifier[]>([]);
//       for (const item of this.inventory) {
//         modifiers.push(...item.attributes);
//       }
//       return modifiers;
//     });
//   }

//   public static create() {
//     const instance = new Player();
//     return shallowReactive(instance);
//   }
// }
