import { defineStore } from 'pinia';

import { Item } from '@/models';
import { shallowReactive, shallowReadonly, shallowRef } from 'vue';

export const useStoreGame = defineStore('storeGame', () => {
  const currentGold = shallowRef(1000);
  const maxInventorySize = 6;

  const item1 = new Item('Ancient Sword', 200);
  const item2 = new Item('Black Sword', 125);
  const item3 = new Item('Cursed Sword', 150);
  const item4 = new Item('Double Sword', 140);
  const item5 = new Item('Epic Sword', 300);
  const item6 = new Item('Fire Sword', 250);
  const item7 = new Item('Fusion Sword', 150);
  const item8 = new Item('Ice Sword', 240);
  const item9 = new Item('Steel Sword', 100);

  const shopOne = [
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    item7,
    item8,
    item9,
  ];

  const inventory = shallowReactive<Item[]>([]);

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

  function sellItem(item: Item) {
    const itemIndex = inventory.indexOf(item);
    if (itemIndex === -1) {
      console.log('Item not found');
      return;
    }

    inventory.splice(itemIndex, 1);
    currentGold.value += item.goldCost / 2;
  }

  return shallowReadonly({
    shopOne,
    inventory,
    buyItem,
    sellItem,
  });
});
