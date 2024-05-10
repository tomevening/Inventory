<script setup lang="ts">
  import { Item } from '@/models';

  defineProps<{
    item: Item;
  }>();
</script>

<template>
  <img
    alt="item.name"
    class="h-20"
    :src="item.icon"
  />
</template>

<style lang="scss"></style>
