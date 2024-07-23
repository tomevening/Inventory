<script setup lang="ts">
  import { useStoreGame } from '@/stores';
  const store = useStoreGame();

  function debug() {
    console.log(store);
  }
</script>

<template>
  <button @click="debug">Debug</button>
</template>

<style lang="scss"></style>
