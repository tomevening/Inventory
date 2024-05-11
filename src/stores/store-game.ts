import { defineStore } from 'pinia';

import { Item, Shop } from '@/models';
import { shallowReactive, shallowReadonly, shallowRef } from 'vue';

export const useStoreGame = defineStore('storeGame', () => {
  const currentGold = shallowRef(1500);
  const maxInventorySize = 6;
  const selectedShopId = shallowRef(0);

  const iSwordAnc = new Item('Ancient Sword', 200);
  const iSwordBlack = new Item('Black Sword', 125);
  const iSwordCurse = new Item('Cursed Sword', 150);
  const iSwordDouble = new Item('Double Sword', 140);
  const iSwordEpic = new Item('Epic Sword', 300);
  const iSwordFire = new Item('Fire Sword', 250);
  const iSwordFus = new Item('Fusion Sword', 150);
  const iSwordIce = new Item('Ice Sword', 240);
  const iSwordSteel = new Item('Steel Sword', 50);

  const iMiscPandAm = new Item('Panda Amulet', 90);
  const iMiscBookKnow = new Item('Book of Knowledge', 60);
  const iMiscEmRing = new Item('Emerald Ring', 80);
  const iMiscGoldKey = new Item('Golden Key', 50);
  const iMiscMagHat = new Item('Magic Hat', 40);
  const iMiscApple = new Item('Red Apple', 20);
  const iMiscRedSph = new Item('Red Sphere', 65);
  const iMiscSapRing = new Item('Sapphire Ring', 100);
  const iRune = new Item('Rune', 50);

  const swordsShop = new Shop('Sword Shop', [
    iSwordAnc,
    iSwordBlack,
    iSwordCurse,
    iSwordDouble,
    iSwordEpic,
    iSwordFire,
    iSwordFus,
    iSwordIce,
    iSwordSteel,
  ]);

  const miscShop = new Shop('Misc Shop', [
    iMiscPandAm,
    iMiscBookKnow,
    iMiscEmRing,
    iMiscGoldKey,
    iMiscMagHat,
    iMiscApple,
    iMiscRedSph,
    iMiscSapRing,
    iRune,
  ]);

  const shops = [swordsShop, miscShop];

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

  function selectShop(shopID: number) {
    selectedShopId.value = shopID;
  }

  return shallowReadonly({
    shops,
    inventory,
    buyItem,
    sellItem,
    selectedShopId,
    selectShop,
  });
});
