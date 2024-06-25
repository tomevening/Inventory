// import { Attribute } from '@/models';
import { EAttribute } from '@/enums';

export type AttributeModifier = {
  // attribute:
  //   | 'Strength'
  //   | 'Agility'
  //   | 'Intelligence'
  //   | 'Attack cooldown'
  //   | 'Critical chance'
  //   | 'Critical damage'
  //   | 'Armor'
  //   | 'Damage'
  //   | 'Health points'
  //   | 'Mana points';
  attribute: EAttribute;
  type: 'increase' | 'percentage' | 'multiplier';
  value: number;
};
