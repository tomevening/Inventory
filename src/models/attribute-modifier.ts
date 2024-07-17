import { EAttribute, EModifierType } from '@/enums';

/** Instances of this class represent effects that items can have on player attributes. */

export class AttributeModifier {
  public constructor(
    /** Which attribute is modified my an item (damage, health, etc.)*/
    public readonly attribute: EAttribute,
    /** How item modifies an attribute (adds flat bonus, percentage or multiplier)*/
    public readonly modifierType: EModifierType,
    public readonly value: number,
  ) {}
}
