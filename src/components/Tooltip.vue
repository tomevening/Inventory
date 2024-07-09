<script setup lang="ts">
  import { Product } from '@/models';
  import { onMounted, onUnmounted, ref, shallowRef } from 'vue';
  defineProps<{
    item: Product<any>;
  }>();

  const isTooltipVisible = shallowRef(false);
  const tooltipPosition = shallowRef({ x: 0, y: 75 });

  // function updateTooltipPosition(e: MouseEvent) {
  //   tooltipPosition.value.x = e.clientX;
  //   tooltipPosition.value.y = e.clientY;
  // }

  function showTooltip() {
    isTooltipVisible.value = true;
  }

  function hideTooltip() {
    isTooltipVisible.value = false;
  }

  const tooltipRef = ref<HTMLElement | null>(null);

  onMounted(() => {
    const el = tooltipRef.value;
    el?.addEventListener('mouseover', showTooltip);
    el?.addEventListener('mouseout', hideTooltip);
    // el?.addEventListener('mousemove', updateTooltipPosition);
  });

  onUnmounted(() => {
    const el = tooltipRef.value;
    el?.removeEventListener('mouseover', showTooltip);
    el?.removeEventListener('mouseout', hideTooltip);
    // el?.removeEventListener('mousemove', updateTooltipPosition);
  });
</script>

<template>
  <div
    class="relative inline-block"
    ref="tooltipRef"
  >
    <slot></slot>
    <div
      v-if="isTooltipVisible"
      class="absolute z-10 p-2 mt-2 text-sm text-white bg-black rounded shadow-lg whitespace-nowrap"
      :style="{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px` }"
    >
      {{ item.name }}
      <br />
      {{ item.goldCost }} Gold
    </div>
  </div>
</template>

<style lang="scss"></style>
