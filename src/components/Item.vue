<script setup lang="ts">
  import { Product } from '@/models';
  import { computed } from 'vue';

  const props = defineProps<{
    item: Product<any>;
  }>();

  const itemClasses = computed(() => {
    if (!props.item.icon.brightness) {
      return 'dark';
    }
    return '';
  });
</script>

<template>
  <img
    alt="item.name"
    class="h-20"
    :class="itemClasses"
    :src="item.icon.path"
  />
</template>

<style lang="scss">
  .dark {
    filter: brightness(50%);
  }
</style>
