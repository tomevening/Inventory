import { AttributeModifier } from '@/types';
import { shallowReactive, watch } from 'vue';
import { Item, Product, Recipe } from '.';

export class Player {
  public readonly inventory;
  public readonly currentModifiers;

  private constructor() {
    this.inventory = shallowReactive<Product<Item | Recipe>[]>([]);
    this.currentModifiers = shallowReactive<AttributeModifier[]>([]);

    watch(this.inventory, () => {
      this.currentModifiers.length = 0;

      this.inventory.forEach(item => {
        item.attributes.forEach(attribute => {
          this.currentModifiers.push(attribute);
        });
      });
    });
  }

  public static create() {
    const instance = new Player();
    return shallowReactive(instance);
  }
}
