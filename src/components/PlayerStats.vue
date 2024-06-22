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
    <div>Attack cooldown: {{ storeAttribute.attackCooldown }}</div>
    <div>Critical chance: {{ storeAttribute.critChance.result }}</div>
    <div>Critical damage: {{ storeAttribute.critDamage.result }}</div>
    <div>Armor: {{ storeAttribute.armor }}</div>
    <div>Damage: {{ storeAttribute.damage }}</div>
    <div>Health points: {{ storeAttribute.health }}</div>
    <div>Mana points: {{ storeAttribute.mana }}</div>
    <div>DPS: {{ storeAttribute.DPS }}</div>
    <div>DPS with crit: {{ storeAttribute.CritDPS }}</div>
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
