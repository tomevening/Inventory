<script setup lang="ts">
  /** Main component that holds all other components in it. */

  import { useStoreGame } from '@/stores';
  import Inventory from './Inventory.vue';
  import PlayerStats from './PlayerStats.vue';
  import Shop from './Shop.vue';

  const storeGame = useStoreGame();
</script>

<template>
  <div class="top-grid">
    <div class="flex flex-row p-1 space-x-2 bg-gray-800">
      <div
        v-for="shop in storeGame.shops"
        :key="shop.id"
      >
        <img
          :alt="shop.name"
          class="h-20"
          :src="shop.icon"
          :style="{
            'box-shadow':
              storeGame.selectedShop === shop
                ? '0 0 15px rgba(255,255,200,1)'
                : 'none',
          }"
          @click="storeGame.selectShop(shop)"
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
        :items="storeGame.selectedShop.items"
      />
    </div>
    <div></div>
    <div>
      <Inventory
        :items="storeGame.player.inventory"
        :sell-item="storeGame.sellItem"
      />
    </div>
  </div>
  <PlayerStats
    :player="storeGame.player"
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
