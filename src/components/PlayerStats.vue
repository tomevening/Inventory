<script setup lang="ts">
  import { EAttribute } from '@/enums';
  import { Attribute } from '@/models';

  const props = defineProps<{
    attributes: Map<EAttribute, Attribute>;
    dps: number;
    critDps: number;
  }>();

  console.log(props.attributes.get(EAttribute.STRENGTH)?.result);
</script>

<template>
  <div class="stats">
    <div>Strength: {{ attributes.get(EAttribute.STRENGTH)?.result }}</div>
    <div>Agility: {{ attributes.get(EAttribute.AGILITY)?.result }}</div>
    <div>
      Intelligence: {{ attributes.get(EAttribute.INTELLIGENCE)?.result }}
    </div>
    <div>
      Attack speed: {{ attributes.get(EAttribute.ATTACKSPEED)?.result }}
    </div>
    <div>
      Critical chance: {{ attributes.get(EAttribute.CRITCHANCE)?.result }}
    </div>
    <div>Critical damage: {{ attributes.get(EAttribute.CRITDMG)?.result }}</div>
    <div>Armor: {{ attributes.get(EAttribute.ARMOR)?.result }}</div>
    <div>Damage: {{ attributes.get(EAttribute.DMG)?.result }}</div>
    <div>Health points: {{ attributes.get(EAttribute.HEALTH)?.result }}</div>
    <div>Mana points: {{ attributes.get(EAttribute.MANA)?.result }}</div>
    <div>DPS: {{ dps }}</div>
    <div>DPS with crit: {{ critDps }}</div>
  </div>
</template>

<style lang="scss">
  .stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }
</style>
