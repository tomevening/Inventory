<script setup lang="ts">
  import { ProductAny, Recipe } from '@/models';
  import Tooltip from './Tooltip.vue';

  defineProps<{
    item: ProductAny;
  }>();
</script>

<template>
  <Tooltip :item="item">
    <img
      :alt="item.name"
      class="h-20"
      :src="item.icon"
      :style="{
        filter: item instanceof Recipe ? 'brightness(50%)' : '',
      }"
    />
  </Tooltip>
</template>

<style scoped lang="scss"></style>
