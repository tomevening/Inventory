<script setup lang="ts">
  import { Product } from '@/models';
  import Item from './Item.vue';

  const props = defineProps<{
    items: Product<any>[];
    sellItem: (item: Product<any>) => void;
  }>();

  // TODO: Finish or delete
  let inventory: (Product<any> | null)[] = [];
  inventory.push(...props.items);
  inventory.length = 6;
</script>

<template>
  <div class="inventory">
    <div class="inventory-grid">
      <Item
        v-for="item in items"
        :key="item.id"
        class="inventory-item"
        :item="item"
        @click.right.prevent="() => sellItem(item)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .inventory-grid {
    display: grid;
    grid-template-columns: 80px 80px;
    padding: 5px;
  }

  .inventory-item {
    padding: 4px;
  }

  .inventory {
    background-color: #c4c4c4;
    display: inline-block;
    border: 1px solid;
    min-height: 250;
    min-width: 170;
  }
</style>
