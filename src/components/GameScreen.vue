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
  <div class="flex flex-row p-1 space-x-2 bg-gray-800">
    <div
      v-for="shop in storeGame.shops"
      :key="shop.id"
    >
      <img
        alt="shop.name"
        class="h-20"
        :src="shop.icon"
        @click="() => storeGame.selectShop(storeGame.shops.indexOf(shop))"
      />
    </div>
  </div>
  <div class="grid-container">
    <div>
      <Shop
        :buy-item="storeGame.buyItem"
        :items="shopSelected.items"
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
  .grid-container {
    display: grid;
    grid-template-columns: 3fr 2fr 1fr;
    gap: 20px;
    padding: 5px;
  }
</style>
