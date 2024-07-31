import { EAttribute } from '@/enums';
import { MaybeRefOrGetter } from 'vue';

export type BaseAttribute = {
  value: MaybeRefOrGetter<number>;
  type: EAttribute;
  minCap?: number;
  maxCap?: number;
};
