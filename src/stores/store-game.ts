import { defineStore } from 'pinia';
import { AttributeModifier } from './../types/attribute-modifier';

import { Item, Product, Recipe, Shop } from '@/models';
import { shallowReactive, shallowReadonly, shallowRef } from 'vue';

export const useStoreGame = defineStore('storeGame', () => {
  const currentGold = shallowRef(1500);
  const maxInventorySize = 6;
  const selectedShopId = shallowRef(0);

  const iSwordAnc = new Item('Ancient Sword', 200);
  const iSwordBlack = new Item('Black Sword', 125);
  const iSwordNoble = new Item('Noble Sword', 150);
  const iSwordEpic = new Item('Epic Sword', 500);
  const iSwordFire = new Item('Fire Sword', 400);
  const iSwordFus = new Item('Fusion Sword', 150);
  const iSwordIce = new Item('Ice Sword', 240);
  const iSwordSteel = new Item('Steel Sword', 70);
  const iSwordStone = new Item('Stone Sword', 40);
  const iSwordCopper = new Item('Copper Sword', 50);
  const iSwordDruid = new Item('Druid Sword', 420);
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
    rEpicSword,
    rFireSword,
    rDruidSword,
  ]);

  const shops = [swordsShop, miscShop, tierOneShop];
  const inventory = shallowReactive<Product[]>([]);

  function buyItem(product: Product) {
    if (product.goldCost > currentGold.value) {
      console.log('Not enough gold to buy!');
      return;
    }

    if (inventory.length === maxInventorySize) {
      console.log("Can't carry more items");
      return;
    }

    currentGold.value -= product.goldCost;
    addItem(product);
  }

  function addItem(product: Product) {
    inventory.push(product.clone());
    checkRecipes();
    refreshAttributes();
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
    recipe.parts.forEach(part => removeItemByName(part.name));
    addItem(recipe.result);
    removeItem(recipe);
  }

  function sellItem(product: Product) {
    currentGold.value += Math.round(product.goldCost / 2);
    removeItem(product);
  }

  function removeItem(product: Product) {
    console.log(product);
    const itemIndex = inventory.indexOf(product);
    if (itemIndex === -1) {
      console.log('Item not found');
      return;
    }
    inventory.splice(itemIndex, 1);
    refreshAttributes();
  }

  function removeItemByName(productName: string) {
    const item = inventory.find(product => product.name === productName);
    if (!item) return;
    removeItem(item);
  }

  function selectShop(shopID: number) {
    selectedShopId.value = shopID;
  }

  function refreshAttributes() {
    inventory.forEach(item => applyItemAttributes(item));
  }

  function applyItemAttributes(product: Product) {
    if (product.attributes.length === 0) return;
    product.attributes.forEach(item => applyItemAttribute(item));
  }

  function applyItemAttribute(modifier: AttributeModifier) {
    const attributeName = `${modifier.attribute}`;
    switch (modifier.type) {
      case 'increase':
        attributes[attributeName] += modifier.value;
        break;
      case 'percentage':
        attributes[attributeName] *= 1 + modifier.value / 100;
        break;
      case 'multiplier':
        attributes[attributeName] *= modifier.value;
        break;
    }
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
