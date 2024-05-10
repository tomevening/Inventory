<script setup lang="ts">
  import { useStoreGame } from '@/stores';
  import Inventory from './Inventory.vue';
  import Shop from './Shop.vue';

  const storeGame = useStoreGame();
</script>

<template>
  <div class="container">
    <div>
      <Shop
        :buy-item="storeGame.buyItem"
        :items="storeGame.shopOne"
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
