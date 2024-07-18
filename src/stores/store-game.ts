/**  Pinia store that manages items and shops */

import { EAttribute, EModifierType } from '@/enums';
import {
  AttributeModifier,
  Item,
  Player,
  ProductAny,
  Recipe,
  Shop,
} from '@/models';
import { defineStore } from 'pinia';
import { shallowReactive, shallowReadonly, shallowRef } from 'vue';

export const useStoreGame = defineStore('storeGame', () => {
  const currentGold = shallowRef(1500);
  const maxInventorySize = 6;

  // Creating all the items and giving them their attributes. Probably not perfectly balanced
  const iSwordAnc = new Item('Ancient Sword', 200, [
    new AttributeModifier(EAttribute.DMG, EModifierType.INCREASE, 20),
    new AttributeModifier(EAttribute.ARMOR, EModifierType.INCREASE, -5),
  ]);

  const iSwordBlack = new Item('Black Sword', 125, [
    new AttributeModifier(EAttribute.STRENGTH, EModifierType.INCREASE, 25),
    new AttributeModifier(EAttribute.HEALTH, EModifierType.INCREASE, -200),
  ]);

  const iSwordNoble = new Item('Noble Sword', 150, [
    new AttributeModifier(EAttribute.STRENGTH, EModifierType.INCREASE, 10),
  ]);

  const iSwordEpic = new Item('Epic Sword', 300, [
    new AttributeModifier(EAttribute.DMG, EModifierType.INCREASE, 45),
    new AttributeModifier(EAttribute.ATTACKSPEED, EModifierType.PERCENTAGE, 35),
  ]);

  const iSwordFire = new Item('Fire Sword', 250, [
    new AttributeModifier(EAttribute.STRENGTH, EModifierType.MULTIPLIER, 2),
  ]);

  const iSwordFus = new Item('Fusion Sword', 150, [
    new AttributeModifier(EAttribute.DMG, EModifierType.INCREASE, 33),
  ]);

  const iSwordIce = new Item('Ice Sword', 240, [
    new AttributeModifier(EAttribute.DMG, EModifierType.INCREASE, 20),
    new AttributeModifier(EAttribute.ARMOR, EModifierType.INCREASE, 5),
  ]);

  const iSwordSteel = new Item('Steel Sword', 70, [
    new AttributeModifier(EAttribute.DMG, EModifierType.INCREASE, 15),
  ]);

  const iSwordStone = new Item('Stone Sword', 40, [
    new AttributeModifier(EAttribute.STRENGTH, EModifierType.INCREASE, 5),
    new AttributeModifier(EAttribute.HEALTH, EModifierType.INCREASE, 30),
  ]);

  const iSwordCopper = new Item('Copper Sword', 50, [
    new AttributeModifier(EAttribute.DMG, EModifierType.INCREASE, 25),
    new AttributeModifier(EAttribute.AGILITY, EModifierType.INCREASE, -10),
  ]);

  const iSwordDruid = new Item('Druid Sword', 200, [
    new AttributeModifier(EAttribute.STRENGTH, EModifierType.INCREASE, 30),
    new AttributeModifier(EAttribute.ARMOR, EModifierType.PERCENTAGE, 25),
    new AttributeModifier(EAttribute.HEALTH, EModifierType.PERCENTAGE, 25),
  ]);

  const iSwordLong = new Item('Long Sword', 130, [
    new AttributeModifier(EAttribute.STRENGTH, EModifierType.INCREASE, 15),
    new AttributeModifier(EAttribute.AGILITY, EModifierType.INCREASE, 5),
  ]);

  const iMiscPandAm = new Item('Panda Amulet', 90, [
    new AttributeModifier(EAttribute.STRENGTH, EModifierType.INCREASE, 5),
    new AttributeModifier(EAttribute.AGILITY, EModifierType.INCREASE, 5),
    new AttributeModifier(EAttribute.INTELLIGENCE, EModifierType.INCREASE, 5),
  ]);
  const iMiscBookKnow = new Item('Book of Knowledge', 60, [
    new AttributeModifier(EAttribute.INTELLIGENCE, EModifierType.INCREASE, 5),
    new AttributeModifier(EAttribute.MANA, EModifierType.PERCENTAGE, 15),
  ]);
  const iMiscEmRing = new Item('Emerald Ring', 80, [
    new AttributeModifier(EAttribute.HEALTH, EModifierType.INCREASE, 60),
  ]);
  const iMiscGoldKey = new Item('Golden Key', 50, [
    new AttributeModifier(EAttribute.CRITCHANCE, EModifierType.INCREASE, 20),
  ]);
  const iMiscMagHat = new Item('Magic Hat', 40, [
    new AttributeModifier(EAttribute.INTELLIGENCE, EModifierType.INCREASE, 6),
  ]);
  const iMiscApple = new Item('Red Apple', 20, [
    new AttributeModifier(EAttribute.HEALTH, EModifierType.PERCENTAGE, 10),
  ]);
  const iMiscRedSph = new Item('Red Sphere', 65, [
    new AttributeModifier(EAttribute.INTELLIGENCE, EModifierType.INCREASE, 5),
    new AttributeModifier(EAttribute.DMG, EModifierType.INCREASE, 5),
  ]);
  const iMiscSapRing = new Item('Sapphire Ring', 100, [
    new AttributeModifier(EAttribute.MANA, EModifierType.INCREASE, 60),
  ]);
  const iMiscRune = new Item('Rune', 50, [
    new AttributeModifier(EAttribute.CRITDMG, EModifierType.INCREASE, 0.3),
  ]);
  const iMiscFireCr = new Item('Fire Crystall', 50, [
    new AttributeModifier(EAttribute.STRENGTH, EModifierType.PERCENTAGE, 10),
  ]);

  // Creating all recipes for multi-parts items
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

  // Creating all the shops
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

  const tierOneShop = new Shop('Tier One Shop', [
    rEpicSword,
    rFireSword,
    rDruidSword,
  ]);

  const shops = shallowReactive([swordsShop, miscShop, tierOneShop]);
  const selectedShop = shallowRef<Shop>(shops[0]);
  const player = Player.create();

  // Initialization ends here

  function buyItem(product: ProductAny) {
    if (product.goldCost > currentGold.value) {
      alert('Not enough gold to buy!');
      return;
    }

    if (player.inventory.length >= maxInventorySize) {
      alert("Can't carry more items");
      return;
    }

    currentGold.value -= product.goldCost;
    addItem(product);
  }

  function addItem(product: ProductAny) {
    player.inventory.push(product.clone());
    checkRecipes();
  }

  /**  Checking if we have any recipes */
  function checkRecipes() {
    const recipies = player.inventory.filter(
      (product): product is Recipe => product instanceof Recipe,
    );
    const productNames = player.inventory.map(product => product.name);
    for (const recipe of recipies) {
      console.log('Recipe found');
      tryAssemblingItem(recipe, productNames);
    }
  }

  /**  Checking if we have all the parts for any of the multi-parts items */
  function tryAssemblingItem(recipe: Recipe, productNames: string[]) {
    const allPartPresent = recipe.parts.every(part =>
      productNames.includes(part.name),
    );

    if (!allPartPresent) return;

    console.log(`Finished recipe found: ${recipe.name}. Combining...`);
    for (const part of recipe.parts) {
      removeItemByName(part.name);
    }
    addItem(recipe.result);
    removeItem(recipe);
  }

  function sellItem(product: ProductAny) {
    currentGold.value += Math.round(product.goldCost / 2);
    removeItem(product);
  }

  function removeItem(product: ProductAny) {
    const itemIndex = player.inventory.indexOf(product);
    if (itemIndex === -1) {
      console.log('Item not found');
      return;
    }
    player.inventory.splice(itemIndex, 1);
  }

  function removeItemByName(productName: string) {
    const item = player.inventory.find(product => product.name === productName);
    if (!item) return;
    removeItem(item);
  }

  function selectShop(shop: Shop) {
    selectedShop.value = shop;
  }

  return shallowReadonly({
    shops,
    player,
    buyItem,
    sellItem,
    selectShop,
    currentGold,
    selectedShop,
  });
});
