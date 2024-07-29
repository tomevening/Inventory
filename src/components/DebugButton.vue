<script setup lang="ts">
  import { useStoreGame } from '@/stores';

  /** Temporary component, should be deleted before last commit */
  const store = useStoreGame();

  // watchEffect(() => console.log(`Effect: ${store.player.currentModifiers}`));
  // watchEffect(() => console.log(store.player.currentModifiers));

  // watch(store.player.inventory.items, () =>
  //   console.log(store.player.inventory.items),
  // );

  function debug() {
    {
      console.log(store.player.currentModifiers);
      console.log(store.player.strength);
      console.log(store.player.inventory.items);
    }
  }
</script>

<template>
  <button @click="debug">Debug</button>
  {{ store.player.baseStrength }}
  {{ store.player.strength }}
  {{ store.player.baseHealth }}
  {{ store.player.health }}
</template>

<style lang="scss"></style>
