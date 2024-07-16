export const EAttribute = {
  STRENGTH: 'Strength',
  AGILITY: 'Agility',
  INTELLIGENCE: 'Intelligence',
  ATTACKSPEED: 'Attack Speed',
  CRITCHANCE: 'Crit Chance',
  CRITDMG: 'Crit Damage',
  ARMOR: 'Armor',
  DMG: 'Damage',
  HEALTH: 'Health',
  MANA: 'Mana',
  DPS: 'DPS',
  DPSCRIT: 'Crit DPS',
} as const;

export type EAttribute = (typeof EAttribute)[keyof typeof EAttribute];
