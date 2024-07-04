<script setup lang="ts">
  import { useStoreGame } from '@/stores';
  import { watchEffect } from 'vue';
  const store = useStoreGame();

  watchEffect(() => console.log(store.player.currentModifiers));

  function debug() {
    console.log(store.player.currentModifiers);
  }
</script>

<template>
  <button @click="debug">Debug</button>
</template>

<style lang="scss"></style>
