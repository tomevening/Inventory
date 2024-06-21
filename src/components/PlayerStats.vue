<script setup lang="ts">
  // TODO: Do not import it here
  import { useStoreAttributes } from '@/stores';

  const storeAttribute = useStoreAttributes();
</script>

<template>
  <div class="stats">
    <div>Strength: {{ storeAttribute.strength.result }}</div>
    <div>Agility: {{ storeAttribute.agility.result }}</div>
    <div>Intelligence: {{ storeAttribute.intelligence.result }}</div>
    <div>Attack speed: {{ storeAttribute.attackSpeed.result }}</div>
    <div>Critical chance: {{ storeAttribute.critChance.result }}</div>
    <div>Critical damage: {{ storeAttribute.critDamage.result }}</div>
    <div>Armor: 10</div>
    <div>Damage: 10</div>
    <div>Health points: 10</div>
    <div>Mana points: 10</div>
    <div>DPS: 10</div>
    <div>DPS with crit: 10</div>
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
