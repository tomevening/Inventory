import { EModifierType } from '@/enums';
import { AttributeModifier } from '@/models';
import { BaseAttribute } from '@/types';
import { ComputedRef, MaybeRefOrGetter, computed, toValue } from 'vue';

export function useModifyAttribute(
  baseAttribute: MaybeRefOrGetter<BaseAttribute>,
  modifiers: ComputedRef<AttributeModifier[]>,
) {
  return computed(() => {
    const additions: number[] = [];
    const percentages: number[] = [];
    const multipliers: number[] = [];
    const base = toValue(baseAttribute);

    for (const modifier of modifiers.value) {
      switch (modifier.modifierType) {
        case EModifierType.INCREASE:
          if (modifier.attribute === base.type) additions.push(modifier.value);
          break;

        case EModifierType.PERCENTAGE:
          if (modifier.attribute === base.type)
            percentages.push(modifier.value);
          break;

        case EModifierType.MULTIPLIER:
          if (modifier.attribute === base.type)
            multipliers.push(modifier.value);
          break;
      }
    }

    let attribute = toValue(base.value);
    attribute += additions.reduce((a, b) => a + b, 0);
    attribute += attribute * (percentages.reduce((a, b) => a + b, 0) / 100);
    attribute *= multipliers.reduce((a, b) => a * b, 1);
    attribute = applyCaps(attribute, base);
    return { base, attribute };
  });
}

function applyCaps(attribute: number, base: MaybeRefOrGetter<BaseAttribute>) {
  const minCap = toValue(base).minCap;
  if (minCap) {
    if (attribute < minCap) attribute = minCap;
  }
  const maxCap = toValue(base).maxCap;
  if (maxCap) {
    if (attribute > maxCap) attribute = maxCap;
  }
  return attribute;
}
