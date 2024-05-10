<script setup lang="ts">
  import { Item as ItemClass } from '@/models';
  import Item from './Item.vue';

  defineProps<{
    items: ItemClass[];
  }>();
</script>

<template>
  <div class="shop">
    <div class="shop-grid">
      <Item
        v-for="item in items"
        :key="item.name"
        class="shop-item"
        :item="item"
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
    padding: 5px;
  }

  .shop {
    background-color: #c4c4c4;
    display: inline-block;
  }
</style>
