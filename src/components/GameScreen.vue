<script setup lang="ts">
  /** Main component that holds all other components in it. */

  import { useStoreGame } from '@/stores';
  import Inventory from './Inventory.vue';
  import PlayerStats from './PlayerStats.vue';
  import Shop from './Shop.vue';

  const storeGame = useStoreGame();
  console.log(storeGame.shops[0].items);
</script>

<template>
  <div class="mx-auto max-w-[80rem] py-2 px-[0.8rem]">
    <div class="grid grid-cols-5">
      <div class="col-span-4 flex flex-row p-2 space-x-2 bg-gray-800">
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
      <div
        class="col-span-1 bg-gray-300 flex justify-center items-center text-yellow-600"
      >
        Gold left: {{ storeGame.player.currentGold }}
      </div>
    </div>
  </div>

  <div class="mx-auto max-w-[80rem] px-[0.8rem]">
    <div class="flex justify-between">
      <div>
        <Shop
          :items="storeGame.selectedShop.items"
          @buy="product => storeGame.buyItem(product)"
        />
      </div>
      <div></div>
      <div>
        <Inventory
          :items="storeGame.player.inventory.items"
          @sell="product => storeGame.sellItem(product)"
        />
      </div>
    </div>
  </div>

  <PlayerStats
    class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-stone-100 rounded-lg p-3 shadow inset-shadow-xl shadow-red-300"
    :player="storeGame.player"
  />
</template>

<style scoped lang="scss"></style>
