<script setup lang="ts">
  import { Player } from '@/models';

  defineProps<{
    player: Player;
    // attributes: Map<EAttribute, Attribute>;
    // dps: number;
    // critDps: number;
  }>();

  // console.log(props.attributes.get(EAttribute.STRENGTH)?.result);
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

    <div>Strength: {{ player.strength.result?.toFixed(1) }}</div>
    <div>Agility: {{ player.agility.result?.toFixed(1) }}</div>
    <div>
      Intelligence:
      {{ player.intelligence.result?.toFixed(1) }}
    </div>
    <div>
      Attack speed:
      {{ player.attackSpeed.result?.toFixed(1) }}
    </div>
    <div>
      Critical chance:
      {{ player.critChance.result?.toFixed(1) }}
    </div>
    <div>
      Critical damage:
      {{ player.critDamage.result?.toFixed(1) }}
    </div>
    <div>Armor: {{ player.armor.result?.toFixed(1) }}</div>
    <div>Damage: {{ player.damage.result?.toFixed(1) }}</div>
    <div>Health points: {{ player.health.result?.toFixed(1) }}</div>
    <div>Mana points: {{ player.mana.result?.toFixed(1) }}</div>
    <div>DPS: {{ player.DPS.value.toFixed(1) }}</div>
    <div>DPS with crit: {{ player.CritDPS.value.toFixed(1) }}</div>
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
