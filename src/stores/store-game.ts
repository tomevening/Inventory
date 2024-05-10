import { defineStore } from 'pinia';

import { Item } from '@/models';
import { reactive, ref, shallowReadonly } from 'vue';

export const useStoreGame = defineStore('storeGame', () => {
  const currentGold = ref(1000);
  const maxInventorySize = 6;

  const item1 = new Item('Sword', 200, 'msword');
  const item2 = new Item('Sword', 20, 'msword');
  const item3 = new Item('Sword', 20, 'msword');
  const item4 = new Item('Sword', 20, 'msword');
  const item5 = new Item('Sword', 20, 'msword');
  const item6 = new Item('Sword', 20, 'msword');

  const shopOne = [item1, item2, item3, item4, item5, item6];

  const inventory = reactive([new Item('Sword', 20, 'msword')]);

  function buyItem(item: Item) {
    if (item.goldCost > currentGold.value) {
      console.log('Not enough gold to buy!');
      return;
    }

    if (inventory.length === maxInventorySize) {
      console.log("Can't carry more items");
      return;
    }

    inventory.push(item);
    currentGold.value -= item.goldCost;
  }

  return shallowReadonly({
    shopOne,
    inventory,
    buyItem,
  });
});
