<script setup lang="ts">
  import { Item as ItemClass } from '@/models';
  import Item from './Item.vue';

  defineProps<{
    items: ItemClass[];
    sellItem: (item: ItemClass) => void;
  }>();
</script>

<template>
  <div class="inventory">
    <div class="inventory-grid">
      <Item
        v-for="item in items"
        :key="item.name"
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
    min-height: 250;
    min-width: 170;
  }
</style>
