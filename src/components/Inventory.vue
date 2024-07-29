<script setup lang="ts">
  import { ProductAny } from '@/models';
  import { watchEffect } from 'vue';
  import Item from './Item.vue';

  const props = defineProps<{
    items: ProductAny[];
  }>();

  watchEffect(() => console.log(props.items));

  const emit = defineEmits<{
    (event: 'sell', product: ProductAny): void;
  }>();
</script>

<template>
  <div class="inventory">
    <div class="inventory-grid">
      <Item
        v-for="item in items"
        :key="item.id"
        class="inventory-item"
        :item="item"
        @click.right.prevent="emit('sell', item)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .inventory-grid {
    display: grid;
    grid-template-columns: 5rem 5rem;
    padding: 0.45rem;
    gap: 0.45rem;
    grid-template-columns: repeat(2, 5rem);
    grid-template-rows: repeat(3, 5rem);
  }

  .inventory {
    background-color: #c4c4c4;
    display: inline-block;
    border: 1px solid;
    min-height: 250;
    min-width: 170;
  }
</style>
