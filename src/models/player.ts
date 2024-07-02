import { AttributeModifier } from '@/types';
import { ComputedRef, ShallowReactive, shallowReactive } from 'vue';
import { Item, Product, Recipe } from '.';

export class Player {
  private constructor(
    public readonly inventory: ShallowReactive<Product<Item | Recipe>[]>,
    public readonly attributeModifiers: ComputedRef<AttributeModifier[]>,
  ) {}

  public static create(
    inventory: ShallowReactive<Product<Item | Recipe>[]>,
    attributeModifiers: ComputedRef<AttributeModifier[]>,
  ) {
    const instance = new Player(inventory, attributeModifiers);
    return shallowReactive(instance);
  }
}
