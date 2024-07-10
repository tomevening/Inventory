export const EAttribute = {
  STRENGTH: 'Strength',
  AGILITY: 'Agility',
  INTELLIGENCE: 'Intelligence',
  ATTACKSPEED: 'AttackSpeed',
  CRITCHANCE: 'CritChance',
  CRITDMG: 'CritDamage',
  ARMOR: 'Armor',
  DMG: 'Damage',
  HEALTH: 'Health',
  MANA: 'Mana',
  DPS: 'DPS',
  DPSCRIT: 'CritDPS',
} as const;

export type EAttribute = (typeof EAttribute)[keyof typeof EAttribute];
