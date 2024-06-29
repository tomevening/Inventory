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
    <!-- <div>
      <div
        v-for="[attributeType, attribute] in attributes"
        :key="attributeType"
      >
        {{ attributeType }}: {{ attribute.result?.toFixed(1) }}
      </div>
    </div> -->

    <div>
      Strength: {{ attributes.get(EAttribute.STRENGTH)?.result?.toFixed(1) }}
    </div>
    <div>
      Agility: {{ attributes.get(EAttribute.AGILITY)?.result?.toFixed(1) }}
    </div>
    <div>
      Intelligence:
      {{ attributes.get(EAttribute.INTELLIGENCE)?.result?.toFixed(1) }}
    </div>
    <div>
      Attack speed:
      {{ attributes.get(EAttribute.ATTACKSPEED)?.result?.toFixed(1) }}
    </div>
    <div>
      Critical chance:
      {{ attributes.get(EAttribute.CRITCHANCE)?.result?.toFixed(1) }}
    </div>
    <div>
      Critical damage:
      {{ attributes.get(EAttribute.CRITDMG)?.result?.toFixed(1) }}
    </div>
    <div>Armor: {{ attributes.get(EAttribute.ARMOR)?.result?.toFixed(1) }}</div>
    <div>Damage: {{ attributes.get(EAttribute.DMG)?.result?.toFixed(1) }}</div>
    <div>
      Health points: {{ attributes.get(EAttribute.HEALTH)?.result?.toFixed(1) }}
    </div>
    <div>
      Mana points: {{ attributes.get(EAttribute.MANA)?.result?.toFixed(1) }}
    </div>
    <div>DPS: {{ dps?.toFixed(1) }}</div>
    <div>DPS with crit: {{ critDps?.toFixed(1) }}</div>
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
