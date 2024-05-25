import { defineStore } from 'pinia';

import { Item, Product, Recipe, Shop } from '@/models';
import { shallowReactive, shallowReadonly, shallowRef } from 'vue';

export const useStoreGame = defineStore('storeGame', () => {
  const currentGold = shallowRef(1500);
  const maxInventorySize = 6;
  const selectedShopId = shallowRef(0);

  const iSwordAnc = new Item('Ancient Sword', 200);
  const iSwordBlack = new Item('Black Sword', 125);
  const iSwordNoble = new Item('Noble Sword', 150);
  const iSwordEpic = new Item('Epic Sword', 300);
  const iSwordFire = new Item('Fire Sword', 250);
  const iSwordFus = new Item('Fusion Sword', 150);
  const iSwordIce = new Item('Ice Sword', 240);
  const iSwordSteel = new Item('Steel Sword', 70);
  const iSwordStone = new Item('Stone Sword', 40);
  const iSwordCopper = new Item('Copper Sword', 50);
  const iSwordDruid = new Item('Druid Sword', 130);
  const iSwordLong = new Item('Long Sword', 130);

  const iMiscPandAm = new Item('Panda Amulet', 90);
  const iMiscBookKnow = new Item('Book of Knowledge', 60);
  const iMiscEmRing = new Item('Emerald Ring', 80);
  const iMiscGoldKey = new Item('Golden Key', 50);
  const iMiscMagHat = new Item('Magic Hat', 40);
  const iMiscApple = new Item('Red Apple', 20);
  const iMiscRedSph = new Item('Red Sphere', 65);
  const iMiscSapRing = new Item('Sapphire Ring', 100);
  const iMiscRune = new Item('Rune', 50);
  const iMiscFireCr = new Item('Fire Crystall', 50);

  const swordsShop = new Shop('Sword Shop', [
    iSwordStone,
    iSwordCopper,
    iSwordSteel,
    iSwordAnc,
    iSwordFus,
    iSwordLong,
    iSwordIce,
    iSwordNoble,
    iSwordBlack,
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
    iMiscRune,
    iMiscFireCr,
  ]);

  const rEpicSword = new Recipe(
    [iSwordSteel, iMiscMagHat, iMiscGoldKey],
    iSwordEpic,
    100,
  );

  const rFireSword = new Recipe([iSwordSteel, iMiscFireCr], iSwordFire, 150);

  const rDruidSword = new Recipe(
    [iSwordStone, iMiscApple, iMiscPandAm],
    iSwordDruid,
    60,
  );

  const tierOneShop = new Shop('Tier One Shop', [
    // iSwordEpic,
    // iSwordFire,
    // iSwordDruid,
    rEpicSword,
    rFireSword,
    rDruidSword,
  ]);

  const shops = [swordsShop, miscShop, tierOneShop];
  const inventory = shallowReactive<Product[]>([]);

  function buyItem(item: Item) {
    if (item.goldCost > currentGold.value) {
      console.log('Not enough gold to buy!');
      return;
    }

    if (inventory.length === maxInventorySize) {
      console.log("Can't carry more items");
      return;
    }

    currentGold.value -= item.goldCost;
    addItem(item);
  }

  function addItem(product: Product) {
    inventory.push(product);
    checkRecipes();
  }

  function checkRecipes() {
    const recipies = inventory.filter(
      (product): product is Recipe => product instanceof Recipe,
    );
    const productNames = inventory.map(product => product.name);
    recipies.forEach(recipe => {
      console.log('Recipe found');
      tryAssemblingItem(recipe, productNames);
    });
  }

  function tryAssemblingItem(recipe: Recipe, productNames: string[]) {
    const allPartPresent = recipe.parts.every(part =>
      productNames.includes(part.name),
    );

    if (!allPartPresent) return;

    console.log(`Finished recipe found: ${recipe.name}. Combining...`);
    recipe.parts.forEach(part => removeItem(part));
    addItem(recipe.result);
    removeItem(recipe);
  }

  function sellItem(item: Item) {
    currentGold.value += item.goldCost / 2;
    removeItem(item);
  }

  function removeItem(product: Product) {
    const itemIndex = inventory.indexOf(product);
    if (itemIndex === -1) {
      console.log('Item not found');
      return;
    }

    inventory.splice(itemIndex, 1);
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
    currentGold,
  });
});
