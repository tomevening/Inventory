import { EAttribute, EModifierType } from '@/enums';

export class AttributeModifier {
  public constructor(
    public readonly attribute: EAttribute,
    public readonly modifierType: EModifierType,
    public readonly value: number,
  ) {}
}
