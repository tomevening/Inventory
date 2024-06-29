import { defineStore } from 'pinia';

import { EAttribute } from '@/enums';
import { Attribute } from '@/models';
import { computed, shallowReadonly, watchEffect } from 'vue';

export const useStoreAttributes = defineStore('storeAttributes', () => {
  const attributes = new Map<EAttribute, Attribute>();

  const strength = Attribute.create(11);
  strength.percentageIncreases.push(26.001);
  strength.percentageIncreases.push(25);
  attributes.set(EAttribute.STRENGTH, strength as Attribute);

  const health = Attribute.create(100);
  watchEffect(() => health.setBaseAttributeIncrement(strength.result * 6));
  attributes.set(EAttribute.HEALTH, health as Attribute);

  const agility = Attribute.create(10);
  attributes.set(EAttribute.AGILITY, agility as Attribute);

  const armor = Attribute.create(5);
  watchEffect(() => armor.setBaseAttributeIncrement(agility.result * 0.2));
  attributes.set(EAttribute.ARMOR, armor as Attribute);

  const attackSpeed = Attribute.create(2);
  watchEffect(() =>
    attackSpeed.setBaseAttributeIncrement(agility.result * 0.2),
  );
  attributes.set(EAttribute.ATTACKSPEED, attackSpeed as Attribute);
  const attackCooldown = computed(() => 1 / attackSpeed.result);

  const intelligence = Attribute.create(10);
  attributes.set(EAttribute.INTELLIGENCE, intelligence as Attribute);

  const mana = Attribute.create(100);
  watchEffect(() => mana.setBaseAttributeIncrement(intelligence.result * 6));
  attributes.set(EAttribute.MANA, mana as Attribute);

  const critChance = Attribute.create(10);
  attributes.set(EAttribute.CRITCHANCE, critChance as Attribute);

  const critDamage = Attribute.create(2);
  attributes.set(EAttribute.CRITDMG, critDamage as Attribute);

  const damage = Attribute.create(10);
  watchEffect(() =>
    damage.setBaseAttributeIncrement(
      Math.max(strength.result, agility.result, intelligence.result),
    ),
  );
  attributes.set(EAttribute.DMG, damage as Attribute);

  const DPS = computed(() => damage.result * (1 / attackCooldown.value));

  const CritDPS = computed(() => {
    return (
      DPS.value +
      DPS.value * ((critChance.result / 100) * (critDamage.result - 1))
    );
  });

  return shallowReadonly({
    DPS,
    CritDPS,
    attributes,
  });
});
