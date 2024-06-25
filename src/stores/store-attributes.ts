import { defineStore } from 'pinia';

import { EAttribute } from '@/enums';
import { Attribute } from '@/models';
import { computed, shallowReadonly } from 'vue';

export const useStoreAttributes = defineStore('storeAttributes', () => {
  const attrubutes = new Map<EAttribute, Attribute>();

  const strength = Attribute.create(10);
  strength.percentageIcrease = 50; // TODO: Optional, remove later
  attrubutes.set(EAttribute.STRENGTH, strength);

  const agility = Attribute.create(10);
  attrubutes.set(EAttribute.AGILITY, agility);

  const intelligence = Attribute.create(10);
  attrubutes.set(EAttribute.INTELLIGENCE, intelligence);

  const critChance = Attribute.create(10);
  attrubutes.set(EAttribute.CRITCHANCE, critChance);

  const critDamage = Attribute.create(2);
  attrubutes.set(EAttribute.CRITDMG, critDamage);

  const armorBase = Attribute.create(10);
  const armor = computed(() => armorBase.result + 0.2 * agility.result);

  const damageBase = Attribute.create(10);
  const damage = computed(() => damageBase.result + strength.result); // TODO: Add max of three main stats

  const healthBase = Attribute.create(100);
  const health = computed(() => healthBase.result + strength.result * 6);

  const manaBase = Attribute.create(100);
  const mana = computed(() => manaBase.result + intelligence.result * 6);

  const attackSpeedBase = Attribute.create(2);
  const attackSpeed = computed(
    () => attackSpeedBase.result + 0.01 * agility.result,
  );
  const attackCooldown = computed(() => +(1 / attackSpeed.value).toFixed(2));

  const DPS = computed(
    () => +(damage.value * (1 / attackCooldown.value)).toFixed(2),
  );

  const CritDPS = computed(() => {
    return +(
      DPS.value +
      DPS.value * ((critChance.result / 100) * (critDamage.result - 1))
    ).toFixed(2);
  });

  return shallowReadonly({
    strength,
    agility,
    intelligence,
    critChance,
    critDamage,
    armor,
    damage,
    health,
    mana,
    attackSpeed,
    attackCooldown,
    DPS,
    CritDPS,
  });
});
