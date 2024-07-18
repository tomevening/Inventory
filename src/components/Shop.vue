<script setup lang="ts">
  import { ProductAny } from '@/models';
  import Item from './Item.vue';

  defineProps<{
    items: ProductAny[];
    buyItem: (item: ProductAny) => void;
  }>();
</script>

<template>
  <div class="shop">
    <div class="shop-grid">
      <Item
        v-for="item in items"
        :key="item.id"
        class="shop-item"
        :item="item"
        @click="buyItem(item)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .shop-grid {
    display: grid;
    grid-template-columns: 80px 80px 80px 80px;
    padding: 5px;
  }

  .shop-item {
    padding: 4px;
  }

  .shop {
    background-color: #c4c4c4;
    display: inline-block;
    border: 1px solid;
  }
</style>
