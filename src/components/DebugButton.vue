<script setup lang="ts">
  import { EAttribute, EModifierType } from '@/enums';
  import { AttributeModifier } from '@/models';
  import { useStoreGame } from '@/stores';
  const store = useStoreGame();

  function debug() {
    console.log(store.player.resultingStrength);
    store.player.attributeModifiers.push(
      new AttributeModifier(EAttribute.STRENGTH, EModifierType.INCREASE, 5),
    );
  }
</script>

<template>
  <button @click="debug">Debug</button>
  {{ store.player.resultingStrength }}
</template>

<style lang="scss"></style>
