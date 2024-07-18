<script setup lang="ts">
  import { ProductAny } from '@/models';
  import Tooltip from './Tooltip.vue';

  const props = defineProps<{
    item: ProductAny;
  }>();
</script>

<template>
  <Tooltip :item="item">
    <img
      alt="item.name"
      class="h-20"
      :style="{
        filter: props.item.icon.isBright ? '' : 'brightness(50%)',
      }"
      :src="item.icon.path"
    />
  </Tooltip>
</template>

<style scoped lang="scss"></style>
