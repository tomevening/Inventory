import { ComputedRef } from 'vue';
import { BaseAttribute } from '.';

export type Attribute = ComputedRef<{
  base: BaseAttribute;
  attribute: number;
}>;
