<script setup lang="ts">
  import { Product } from '@/models';
  import { computed } from 'vue';
  import Tooltip from './Tooltip.vue';

  const props = defineProps<{
    item: Product<any>;
  }>();

  const itemClasses = computed(() => {
    return props.item.icon.isBright ? '' : 'dark';
  });
</script>

<template>
  <Tooltip :item="item">
    <img
      alt="item.name"
      class="h-20"
      :class="itemClasses"
      :src="item.icon.path"
    />
  </Tooltip>
</template>

<style lang="scss">
  .dark {
    filter: brightness(50%);
  }
</style>
