export const EModifierType = {
  INCREASE: 0,
  PERCENTAGE: 1,
  MULTIPLIER: 2,
} as const;

export type EModifierType = (typeof EModifierType)[keyof typeof EModifierType];
