import { defineStore } from 'pinia';

import { Item } from '@/models';
import { shallowReadonly } from 'vue';

export const useStoreGame = defineStore('storeGame', () => {
  const item1 = new Item('Sword', 20, 'msword');
  const item2 = new Item('Sword', 20, 'msword');
  const item3 = new Item('Sword', 20, 'msword');
  const item4 = new Item('Sword', 20, 'msword');
  const item5 = new Item('Sword', 20, 'msword');
  const item6 = new Item('Sword', 20, 'msword');

  const items = [item1, item2, item3, item4, item5, item6];

  const inventory = [new Item('Sword', 20, 'msword')];

  return shallowReadonly({
    items,
    inventory,
  });
});
