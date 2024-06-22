import { defineStore } from 'pinia';

import { Attribute } from '@/models';
import { computed, reactive, shallowReadonly } from 'vue';

export const useStoreAttributes = defineStore('storeAttributes', () => {
  const strength = reactive(new Attribute(10));
  strength.percentageIcrease = 50; // TODO: remove
  const agility = reactive(new Attribute(10));
  const intelligence = reactive(new Attribute(10));
  const critChance = reactive(new Attribute(10));
  const critDamage = reactive(new Attribute(2));

  const armorBase = reactive(new Attribute(10));
  const armor = computed(() => armorBase.result + 0.2 * agility.result);

  const damageBase = reactive(new Attribute(10));
  const damage = computed(() => damageBase.result + strength.result);

  const healthBase = reactive(new Attribute(100));
  const health = computed(() => healthBase.result + strength.result * 6);

  const manaBase = reactive(new Attribute(100));
  const mana = computed(() => manaBase.result + intelligence.result * 6);

  const attackSpeedBase = reactive(new Attribute(2));
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
