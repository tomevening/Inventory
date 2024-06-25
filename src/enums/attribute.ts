export const EAttribute = {
  STRENGTH: 'strength',
  AGILITY: 'agility',
  INTELLIGENCE: 'intelligence',
  ATKCOOLDOWN: 'attackCooldown',
  CRITCHANCE: 'critChance',
  CRITDMG: 'critDamage',
  ARMOR: 'armor',
  DMG: 'damage',
  HEALTH: 'health',
  MANA: 'mana',
} as const;

export type EAttribute = (typeof EAttribute)[keyof typeof EAttribute];
