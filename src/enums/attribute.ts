const EAttribute = {
  STR: 'strength',
  AGI: 'agility',
  INT: 'intelligence',
  ACD: 'attackCooldown',
  CRCH: 'critChance',
  CDMG: 'critDamage',
  ARM: 'armor',
  DMG: 'damage',
  HP: 'health',
  MP: 'mana',
} as const;

export type EAttribute = (typeof EAttribute)[keyof typeof EAttribute];
