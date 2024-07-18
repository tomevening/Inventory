<script setup lang="ts">
  import { EAttribute } from '@/enums';
  import { Player } from '@/models';
  import { watchEffect } from 'vue';

  const props = defineProps<{
    player: Player;
  }>();

  watchEffect(() => console.log(props.player.currentModifiers));

  function assignColor(attributeName: EAttribute) {
    const attribute = props.player.attributes.get(attributeName);
    if (!attribute) return;

    return attribute.baseStat < attribute.result
      ? 'color: #1EB300'
      : attribute.baseStat > attribute.result
      ? 'color: red'
      : 'color: black';
  }
</script>

<template>
  <div class="stats">
    <div v-for="[attributeKey, attributeValue] in props.player.attributes">
      <div :style="assignColor(attributeKey)">
        {{ attributeKey }} {{ attributeValue.result.toFixed(1) }}
      </div>
    </div>
    <div class="mt-4">DPS: {{ player.DPS.value.toFixed(1) }}</div>
    <div>DPS with crit: {{ player.CritDPS.value.toFixed(1) }}</div>
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
