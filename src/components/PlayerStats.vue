<script setup lang="ts">
  import { Player } from '@/models';
  import { Attribute } from '@/types';
  import { toValue } from 'vue';

  defineProps<{
    player: Player;
  }>();

  function assignColor(attribute: Attribute) {
    if (attribute === undefined || attribute.value.base === undefined) return;

    const base = toValue(attribute.value.base.value);
    const result = attribute.value.attribute;

    return base < result
      ? 'color: #1EB300'
      : base > result
      ? 'color: red'
      : 'color: black';
  }
</script>

<template>
  <div class="stats">
    <div :style="assignColor(player.strength)">
      Strength: {{ player.strength.value.attribute }}
    </div>
    <div :style="assignColor(player.health)">
      Health: {{ player.health.value.attribute }}
    </div>
    <div :style="assignColor(player.intelligence)">
      Intelligence: {{ player.intelligence.value.attribute }}
    </div>
    <div :style="assignColor(player.mana)">
      Mana: {{ player.mana.value.attribute }}
    </div>
    <div :style="assignColor(player.agility)">
      Agility: {{ player.agility.value.attribute }}
    </div>
    <div :style="assignColor(player.armor)">
      Armor: {{ player.armor.value.attribute }}
    </div>
    <div :style="assignColor(player.attackSpeed)">
      Attack speed: {{ player.attackSpeed.value.attribute }}
    </div>
    <div :style="assignColor(player.critChance)">
      Crit chance: {{ player.critChance.value.attribute }}
    </div>
    <div :style="assignColor(player.critDamage)">
      Crit damage: {{ player.critDamage.value.attribute }}
    </div>
    <div :style="assignColor(player.damage)">
      Damage: {{ player.damage.value.attribute }}
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
