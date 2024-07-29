import { EAttribute } from '@/enums';
import { AttributeModifier } from '@/models';
import { BaseAttribute } from '@/types';

import {
  ComputedRef,
  ShallowRef,
  computed,
  shallowReactive,
  shallowRef,
} from 'vue';

import { useModifyAttribute } from '@/composables';
import { Inventory } from './inventory';

const MAX_INVENTORY_SIZE = 6;

export class Player {
  // public readonly baseAttributes: Map<EAttribute, BaseAttribute>;
  public readonly inventory = new Inventory(MAX_INVENTORY_SIZE);
  // new Inventory(MAX_INVENTORY_SIZE);
  public currentGold: ShallowRef<number>;

  public readonly baseStrength: ShallowRef<BaseAttribute>;
  public readonly baseHealth: ComputedRef<BaseAttribute>;
  public readonly baseAttributes: Map<
    EAttribute,
    ShallowRef<BaseAttribute> | ComputedRef<BaseAttribute>
  >;

  public readonly strength: ComputedRef<number>;
  public readonly health: ComputedRef<number>;

  private constructor() {
    // public readonly baseHealth = { id: EAttribute.STRENGTH, value: 100 }, // public readonly strength?: ComputedRef<number>, // public readonly baseStrength = { id: EAttribute.STRENGTH, value: 10 }, // public readonly health?: ComputedRef<number>,
    this.currentGold = shallowRef(1500);

    // this.baseAttributes = new Map<EAttribute, BaseAttribute>();
    // this.baseAttributes.set(EAttribute.STRENGTH, { value: 10 });
    // this.baseAttributes.set(EAttribute.HEALTH, { value: 100, minCap: 1 });

    // this.baseAttributes.set(EAttribute.AGILITY, { value: 10 });
    // this.baseAttributes.set(EAttribute.ARMOR, { value: 5 });
    // this.baseAttributes.set(EAttribute.ATTACKSPEED, { value: 1, minCap: 0.1 });

    // this.baseAttributes.set(EAttribute.INTELLIGENCE, { value: 10 });
    // this.baseAttributes.set(EAttribute.MANA, { value: 100, minCap: 1 });

    // this.baseAttributes.set(EAttribute.CRITCHANCE, { value: 10, maxCap: 100 });
    // this.baseAttributes.set(EAttribute.CRITDMG, { value: 2 });
    // this.baseAttributes.set(EAttribute.DMG, { value: 10 });

    this.baseStrength = shallowRef({
      attribute: EAttribute.STRENGTH,
      value: 10,
    });
    this.baseHealth = computed(() => ({
      attribute: EAttribute.STRENGTH,
      value: 100 + this.strength.value * 6,
      maxCap: 150,
    }));

    this.baseAttributes = new Map([
      [EAttribute.STRENGTH, this.baseStrength],
      [EAttribute.HEALTH, this.baseHealth],
    ]);

    this.strength = useModifyAttribute(
      this.baseStrength,
      this.currentModifiers,
    );

    this.health = useModifyAttribute(this.baseHealth, this.currentModifiers);
  }

  /** Creates reactive instances of this class */
  public static create() {
    return shallowReactive(new Player());
  }

  // /** Returns attributes after applying item bonuses, increases from other stats and min/max caps */
  // public get resultingAttributes() {
  //   const result = new Map<EAttribute, number>();

  //   for (const [attribute, baseValue] of this.baseAttributes) {
  //     const modifiers = this.findRelevantModifiers(attribute);
  //     result.set(
  //       attribute,
  //       this.calculateResultingAttribute(baseValue.value, modifiers),
  //     );
  //   }

  //   this.addStatsFromDependencies(result);
  //   this.applyCaps(result);

  //   return result;
  // }

  // /** DPS - damage per second. */
  // public get dps() {
  //   return (
  //     (this.resultingAttributes.get(EAttribute.DMG) ?? 0) *
  //     (1 / this.attackCooldown)
  //   );
  // }

  // /** DPS with criticals */
  // public get critDps() {
  //   const critChance = this.resultingAttributes.get(EAttribute.CRITCHANCE) ?? 0;
  //   const critDamage = this.resultingAttributes.get(EAttribute.CRITDMG) ?? 0;
  //   return this.dps + this.dps * ((critChance / 100) * (critDamage - 1));
  // }

  // public get attackCooldown() {
  //   return 1 / (this.resultingAttributes.get(EAttribute.ATTACKSPEED) ?? 1);
  // }

  // /** Some attributes increase other attributes. These increases are applied here */
  // private addStatsFromDependencies(
  //   modifiedAttributes: Map<EAttribute, number>,
  // ) {
  //   this.modifyHealth(modifiedAttributes);
  //   this.modifyMana(modifiedAttributes);
  //   this.modifyArmor(modifiedAttributes);
  //   this.modifyAttackSpeed(modifiedAttributes);
  //   this.modifyDamage(modifiedAttributes);
  // }

  // private modifyHealth(modifiedAttributes: Map<EAttribute, number>) {
  //   const hp = modifiedAttributes.get(EAttribute.HEALTH);
  //   const str = modifiedAttributes.get(EAttribute.STRENGTH);
  //   if (hp === undefined || str === undefined) return;
  //   modifiedAttributes.set(EAttribute.HEALTH, hp + str * 6);
  // }

  // private modifyMana(modifiedAttributes: Map<EAttribute, number>) {
  //   const mp = modifiedAttributes.get(EAttribute.MANA);
  //   const int = modifiedAttributes.get(EAttribute.INTELLIGENCE);
  //   if (mp === undefined || int === undefined) return;
  //   modifiedAttributes.set(EAttribute.MANA, mp + int * 6);
  // }

  // private modifyArmor(modifiedAttributes: Map<EAttribute, number>) {
  //   const armor = modifiedAttributes.get(EAttribute.ARMOR);
  //   const agi = modifiedAttributes.get(EAttribute.AGILITY);
  //   if (armor === undefined || agi === undefined) return;
  //   modifiedAttributes.set(EAttribute.ARMOR, armor + agi * 0.2);
  // }

  // private modifyAttackSpeed(modifiedAttributes: Map<EAttribute, number>) {
  //   const attackSpeed = modifiedAttributes.get(EAttribute.ATTACKSPEED);
  //   const agi = modifiedAttributes.get(EAttribute.AGILITY);
  //   if (attackSpeed === undefined || agi === undefined) return;
  //   modifiedAttributes.set(EAttribute.ATTACKSPEED, attackSpeed + agi * 0.05);
  // }

  // private modifyDamage(modifiedAttributes: Map<EAttribute, number>) {
  //   const dmg = modifiedAttributes.get(EAttribute.DMG);
  //   const int = modifiedAttributes.get(EAttribute.INTELLIGENCE);
  //   const agi = modifiedAttributes.get(EAttribute.AGILITY);
  //   const str = modifiedAttributes.get(EAttribute.STRENGTH);
  //   if (
  //     dmg === undefined ||
  //     agi === undefined ||
  //     str === undefined ||
  //     int === undefined
  //   )
  //     return;
  //   modifiedAttributes.set(EAttribute.DMG, dmg + Math.max(int, str, agi));
  // }

  /** Returns all bonuses granted by equipped items */
  // public get currentModifiers() {
  //   const modifiers: AttributeModifier[] = [];
  //   for (const item of this.inventory.items) {
  //     modifiers.push(...item.attributes);
  //   }
  //   console.log('Getter');
  //   return modifiers;
  // }

  public readonly currentModifiers = computed(() => {
    const modifiers: AttributeModifier[] = [];
    for (const item of this.inventory.items) {
      modifiers.push(...item.attributes);
    }
    console.log('Getter');
    return modifiers;
  });

  // /** Return all active bonuses to a selected attribute */
  // private findRelevantModifiers(attribute: EAttribute): AttributeModifier[] {
  //   const modifiers: AttributeModifier[] = [];
  //   for (const modifier of this.currentModifiers) {
  //     if (modifier.attribute === attribute) modifiers.push(modifier);
  //   }

  //   return modifiers;
  // }

  // /** Calculates resulting value of a chosen attribute (including base values and item bonuses) */
  // private calculateResultingAttribute(
  //   base: number,
  //   modifiers: AttributeModifier[],
  // ) {
  //   const additions: number[] = [];
  //   const percentages: number[] = [];
  //   const multipliers: number[] = [];
  //   for (const modifier of modifiers) {
  //     switch (modifier.modifierType) {
  //       case EModifierType.INCREASE:
  //         additions.push(modifier.value);
  //         break;

  //       case EModifierType.PERCENTAGE:
  //         percentages.push(modifier.value);
  //         break;

  //       case EModifierType.MULTIPLIER:
  //         multipliers.push(modifier.value);
  //         break;
  //     }
  //   }
  //   let result = base;
  //   result += additions.reduce((a, b) => a + b, 0);
  //   result += result * (percentages.reduce((a, b) => a + b, 0) / 100);
  //   result *= multipliers.reduce((a, b) => a * b, 1);
  //   return result;
  // }

  // /** Some attributes have min and max values. Here these caps are applied */
  // private applyCaps(modifiedAttributes: Map<EAttribute, number>) {
  //   if (!this.baseAttributes) {
  //     throw new Error(`baseAttributes not found`);
  //   }

  //   // Min caps
  //   for (const [attribute, _] of modifiedAttributes) {
  //     const baseAttribute = this.baseAttributes.get(attribute);
  //     if (baseAttribute === undefined) {
  //       throw new Error(`baseAttribute ${attribute} not found`);
  //     }

  //     if (!baseAttribute.value.minCap) continue;

  //     const modifiedAttribute = modifiedAttributes.get(attribute);
  //     if (modifiedAttribute === undefined) {
  //       throw new Error(`modifiedAttribute ${attribute} not found`);
  //     }

  //     if (modifiedAttribute < baseAttribute.value.minCap) {
  //       modifiedAttributes.set(attribute, baseAttribute.value.minCap);
  //     }
  //   }

  //   // Max caps
  //   for (const [attribute, _] of modifiedAttributes) {
  //     const baseAttribute = this.baseAttributes.get(attribute);
  //     if (baseAttribute === undefined) {
  //       throw new Error(`baseAttribute ${attribute} not found`);
  //     }

  //     if (!baseAttribute.value.maxCap) continue;

  //     const modifiedAttribute = modifiedAttributes.get(attribute);
  //     if (modifiedAttribute === undefined) {
  //       throw new Error(`modifiedAttribute ${attribute} not found`);
  //     }

  //     if (modifiedAttribute > baseAttribute.value.maxCap) {
  //       modifiedAttributes.set(attribute, baseAttribute.value.maxCap);
  //     }
  //   }
  // }
}
