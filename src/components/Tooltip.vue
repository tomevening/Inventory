<script setup lang="ts">
  import { EModifierType } from '@/enums';
  import { AttributeModifier, Item, Product, Recipe } from '@/models';
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

  function getAttributeModifiers(product: Product<any>) {
    if (product instanceof Item) {
      return product.attributes;
    } else if (product instanceof Recipe) {
      return product.result.attributes;
    }
  }

  function showAttribute(attribute: AttributeModifier) {
    let result = '';

    const sign = attribute.value > 0 ? '+' : '';

    switch (attribute.modifierType) {
      case EModifierType.INCREASE:
        result = `${sign}${attribute.value} ${attribute.attribute}`;
        break;
      case EModifierType.PERCENTAGE:
        result = `${sign}${attribute.value}% ${attribute.attribute}`;
        break;
      case EModifierType.MULTIPLIER:
        result = `x${attribute.value} ${attribute.attribute}`;
        break;
    }
    return result;
  }

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
      class="absolute z-10 p-1.5 text-sm text-white bg-black rounded shadow-lg whitespace-nowrap"
      :style="{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px` }"
    >
      <div class="font-bold">{{ item.name }}</div>
      <div class="inline-block text-yellow-400">{{ item.goldCost }} Gold</div>

      <div
        v-for="attribute in getAttributeModifiers(item)"
        :key="item.id"
      >
        {{ showAttribute(attribute) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
