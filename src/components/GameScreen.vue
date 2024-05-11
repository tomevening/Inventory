<script setup lang="ts">
  import { useStoreGame } from '@/stores';
  import { computed } from 'vue';
  import Inventory from './Inventory.vue';
  import Shop from './Shop.vue';

  const storeGame = useStoreGame();

  const shopSelected = computed(() => {
    return storeGame.shops[storeGame.selectedShopId];
  });
</script>

<template>
  <div class="container">
    <div>
      <Shop
        :buy-item="storeGame.buyItem"
        :items="shopSelected"
      />
    </div>
    <div></div>
    <div>
      <Inventory
        :items="storeGame.inventory"
        :sell-item="storeGame.sellItem"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container {
    display: grid;
    grid-template-columns: 3fr 2fr 1fr;
    gap: 20px;
    padding: 5px;
  }
</style>
