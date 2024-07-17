<script setup lang="ts">
  /**  Component that holds item data; only shown when hovering over an item. */

  import { useTooltip } from '@/composables';
  import { EModifierType } from '@/enums';
  import { AttributeModifier, Item, Product, Recipe } from '@/models';

  defineProps<{
    item: Product<any>;
  }>();

  const { isTooltipVisible, tooltipPosition, tooltipRef } = useTooltip();

  function getAttributeModifiers(product: Product<any>) {
    if (product instanceof Item) {
      return product.attributes;
    }
    if (product instanceof Recipe) {
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

  function showParts(product: Product<any>) {
    if (!(product instanceof Recipe)) return '';
    return product.parts.map(part => part.name);
  }
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
      :style="{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
      }"
    >
      <div class="font-bold">{{ item.name }}</div>
      <div class="inline-block text-yellow-400">{{ item.goldCost }} Gold</div>

      <div
        v-for="attribute in getAttributeModifiers(item)"
        :key="item.id"
      >
        {{ showAttribute(attribute) }}
      </div>

      <div
        class="text-blue-700"
        v-if="showParts(item)"
      >
        Parts:
      </div>
      <div
        class="italic"
        v-for="name in showParts(item)"
      >
        {{ name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
