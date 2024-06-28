export const EAttribute = {
  STRENGTH: 'strength',
  AGILITY: 'agility',
  INTELLIGENCE: 'intelligence',
  ATTACKSPEED: 'attackSpeed',
  CRITCHANCE: 'critChance',
  CRITDMG: 'critDamage',
  ARMOR: 'armor',
  DMG: 'damage',
  HEALTH: 'health',
  MANA: 'mana',
  DPS: 'DPS',
  DPSCRIT: 'CritDPS',
} as const;

export type EAttribute = (typeof EAttribute)[keyof typeof EAttribute];
