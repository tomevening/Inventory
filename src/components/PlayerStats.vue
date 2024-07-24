<script setup lang="ts">
  import { EAttribute } from '@/enums';
  import { Player } from '@/models';
  import { watchEffect } from 'vue';

  const props = defineProps<{
    player: Player;
  }>();

  watchEffect(() => console.log(props.player.currentModifiers));

  function assignColor(attributeName: EAttribute) {
    const attribute = props.player.resultingAttributes.get(attributeName);
    const baseAttribute = props.player.baseAttributes.get(attributeName);
    if (attribute === undefined || baseAttribute === undefined) return;

    return baseAttribute < attribute
      ? 'color: #1EB300'
      : baseAttribute > attribute
      ? 'color: red'
      : 'color: black';
  }
</script>

<template>
  <div class="stats">
    <div v-for="[attributeKey, attributeValue] in player.resultingAttributes">
      <div :style="assignColor(attributeKey)">
        {{ attributeKey }} {{ attributeValue.toFixed(1) }}
      </div>
    </div>
    <div class="mt-4">DPS: {{ player.dps.toFixed(1) }}</div>
    <div>DPS with crit: {{ player.critDps.toFixed(1) }}</div>
    <div>Attack cooldown: {{ player.attackCooldown.toFixed(2) }}</div>
  </div>
</template>

<style scoped lang="scss">
  .stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }
</style>
