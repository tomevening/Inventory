// Instances of this class represent effects that items can have on player attributes.

import { EAttribute, EModifierType } from '@/enums';

export class AttributeModifier {
  public constructor(
    public readonly attribute: EAttribute, // Which attribute is modified my an item (damage, health, etc.)
    public readonly modifierType: EModifierType, // How it modifies it (adds flat bonus, percentage or multiplier)
    public readonly value: number,
  ) {}
}
