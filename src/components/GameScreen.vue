<script setup lang="ts">
  import { useStoreAttributes, useStoreGame } from '@/stores';
  import { computed } from 'vue';
  import Inventory from './Inventory.vue';
  import PlayerStats from './PlayerStats.vue';
  import Shop from './Shop.vue';

  const storeGame = useStoreGame();
  const storeAttributes = useStoreAttributes();

  const shopSelected = computed(() => {
    return storeGame.shops[storeGame.selectedShopId];
  });
</script>

<template>
  <div class="top-grid">
    <div class="flex flex-row p-1 space-x-2 bg-gray-800">
      <div
        v-for="(shop, index) in storeGame.shops"
        :key="shop.id"
      >
        <img
          alt="shop.name"
          class="h-20"
          :src="shop.icon"
          :style="{
            'box-shadow':
              storeGame.selectedShopId === index
                ? '0 0 15px rgba(255,255,200,1)'
                : 'none',
          }"
          @click="() => storeGame.selectShop(storeGame.shops.indexOf(shop))"
        />
      </div>
    </div>
    <div class="bg-gray-300 flex justify-center items-center text-yellow-600">
      Gold left: {{ storeGame.currentGold }}
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
  <PlayerStats
    :attributes="storeAttributes.attributes"
    :dps="storeAttributes.DPS"
    :crit-dps="storeAttributes.CritDPS"
    class="player-stats"
  />
</template>

<style scoped lang="scss">
  .grid-container {
    display: grid;
    grid-template-columns: 3fr 2fr 1fr;
    gap: 20px;
    padding: 5px;
  }

  .top-grid {
    display: grid;
    grid-template-columns: 5fr 1fr;
  }

  .player-stats {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(255, 0, 0, 0.4);
  }
</style>
