<script setup lang="ts">
  import { useStoreGame } from '@/stores';

  /** Temporary component, should be deleted before last commit */
  const store = useStoreGame();

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
</template>

<style lang="scss"></style>
