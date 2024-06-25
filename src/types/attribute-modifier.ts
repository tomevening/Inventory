// import { Attribute } from '@/models';
import { EAttribute } from '@/enums';

export type AttributeModifier = {
  attribute: EAttribute;
  type: 'increase' | 'percentage' | 'multiplier';
  value: number;
};
