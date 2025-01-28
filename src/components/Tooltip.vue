<script setup lang="ts">
  /**  Component that holds item data; only shown when hovering over an item. */

  import { useTooltip } from '@/composables';
  import { EModifierType } from '@/enums';
  import { AttributeModifier, ProductAny, Recipe } from '@/models';

  defineProps<{
    item: ProductAny;
  }>();

  const { isTooltipVisible, tooltipPosition, tooltipRef } = useTooltip();

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

  function showParts(product: ProductAny) {
    if (!(product instanceof Recipe)) return [];
    return product.parts.map(part => part.name);
  }
</script>

<template>
  <div
    ref="tooltipRef"
    class="relative inline-block"
  >
    <slot></slot>
    <div
      v-if="isTooltipVisible"
      class="absolute z-10 p-1.5 text-sm text-white bg-black rounded shadow-lg whitespace-nowrap"
      :style="{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
      }"
    >
      <div class="font-bold">{{ item.name }}</div>
      <div class="inline-block text-yellow-400">{{ item.goldCost }} Gold</div>

      <div
        v-for="(attribute, index) in item.getAttributeModifiers()"
        :key="index"
      >
        {{ showAttribute(attribute) }}
      </div>

      <div
        v-if="showParts(item).length > 0"
        class="text-blue-700"
      >
        Parts:
      </div>
      <div
        v-for="(name, index) in showParts(item)"
        :key="index"
        class="italic"
      >
        {{ name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
