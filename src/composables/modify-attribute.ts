import { EModifierType } from '@/enums';
import { AttributeModifier } from '@/models';
import { BaseAttribute } from '@/types';
import { ComputedRef, MaybeRefOrGetter, computed, toValue } from 'vue';

export function useModifyAttribute(
  base: MaybeRefOrGetter<BaseAttribute>,
  modifiers: ComputedRef<AttributeModifier[]>,
) {
  return computed(() => {
    const additions: number[] = [];
    const percentages: number[] = [];
    const multipliers: number[] = [];

    console.log(`Composable, mods: ${modifiers}`);

    for (const modifier of modifiers.value) {
      switch (modifier.modifierType) {
        case EModifierType.INCREASE:
          additions.push(modifier.value);
          break;

        case EModifierType.PERCENTAGE:
          percentages.push(modifier.value);
          break;

        case EModifierType.MULTIPLIER:
          multipliers.push(modifier.value);
          break;
      }
    }
    console.log(`Mods: `, modifiers);

    let attribute = toValue(base).value;
    attribute += additions.reduce((a, b) => a + b, 0);
    attribute += attribute * (percentages.reduce((a, b) => a + b, 0) / 100);
    attribute *= multipliers.reduce((a, b) => a * b, 1);
    attribute = applyCaps(attribute, base);

    console.log(`Attribute: ${attribute}`);
    return attribute;
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
