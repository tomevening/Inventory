import { defineStore } from 'pinia';

import { Attribute } from '@/models';
import { reactive, shallowReadonly } from 'vue';

export const useStoreAttributes = defineStore('storeAttributes', () => {
  const strength = reactive(new Attribute(10));
  const agility = reactive(new Attribute(10));
  const intelligence = reactive(new Attribute(10));
  const attackSpeed = reactive(new Attribute(10));
  const critChance = reactive(new Attribute(10));
  const critDamage = reactive(new Attribute(10));

  return shallowReadonly({
    strength,
    agility,
    intelligence,
    attackSpeed,
    critChance,
    critDamage,
  });
});
