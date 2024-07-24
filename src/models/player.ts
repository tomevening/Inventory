import { EAttribute, EModifierType } from '@/enums';
import { AttributeModifier } from '@/models';

import { Reactive, ShallowReactive, shallowReactive, shallowRef } from 'vue';
import { Attribute } from '.';
import { Inventory } from './inventory';

const MAX_INVENTORY_SIZE = 6;
export class Player {
  // public readonly strength: Reactive<Attribute>;
  // public readonly health: Reactive<Attribute>;
  // public readonly agility: Reactive<Attribute>;
  // public readonly armor: Reactive<Attribute>;
  // public readonly attackSpeed: Reactive<Attribute>;
  // public readonly intelligence: Reactive<Attribute>;
  // public readonly mana: Reactive<Attribute>;
  // public readonly critChance: Reactive<Attribute>;
  // public readonly critDamage: Reactive<Attribute>;
  // public readonly damage: Reactive<Attribute>;
  /**  Damage per second is not a full-fledged attribute, it is calculated based on dmg and AS */
  // public readonly DPS: ComputedRef<number>;
  // public readonly CritDPS: ComputedRef<number>;
  // public readonly attackCooldown: ComputedRef<number>;
  // public readonly attributes: Map<EAttribute, Attribute>;

  public readonly baseAttributes: Map<EAttribute, number>;
  // public /*readonly*/ attributeModifiers: ShallowReactive<AttributeModifier[]>;

  public readonly inventory = new Inventory(MAX_INVENTORY_SIZE);

  public readonly attributes = shallowReactive(
    new Map<EAttribute, Reactive<Attribute>>(),
  );
  public readonly currentGold;

  private constructor() {
    // this.attributes = new Map<EAttribute, Attribute>();  TODO: return if reactivity is not needed

    this.currentGold = shallowRef(1500);

    // this.strength = Attribute.create(10, 0);
    // this.attributes.set(EAttribute.STRENGTH, this.strength);

    // this.health = Attribute.create(100, 1);
    // watchEffect(() =>
    //   this.health.setBaseAttributeIncrement(this.strength.result * 6),
    // );
    // this.attributes.set(EAttribute.HEALTH, this.health);

    // this.agility = Attribute.create(10, 0);
    // this.attributes.set(EAttribute.AGILITY, this.agility);

    // this.armor = Attribute.create(5);
    // watchEffect(() =>
    //   this.armor.setBaseAttributeIncrement(this.agility.result * 0.2),
    // );
    // this.attributes.set(EAttribute.ARMOR, this.armor);

    // this.attackSpeed = Attribute.create(1, 0.1);
    // watchEffect(() =>
    //   this.attackSpeed.setBaseAttributeIncrement(this.agility.result * 0.2),
    // );
    // this.attributes.set(EAttribute.ATTACKSPEED, this.attackSpeed);
    // this.attackCooldown = computed(() => 1 / this.attackSpeed.result);

    // this.intelligence = Attribute.create(10, 0);
    // this.attributes.set(EAttribute.INTELLIGENCE, this.intelligence);

    // this.mana = Attribute.create(100, 0);
    // watchEffect(() =>
    //   this.mana.setBaseAttributeIncrement(this.intelligence.result * 6),
    // );
    // this.attributes.set(EAttribute.MANA, this.mana);

    // this.critChance = Attribute.create(10, 0, 100);
    // this.attributes.set(EAttribute.CRITCHANCE, this.critChance);

    // this.critDamage = Attribute.create(2, 1);
    // this.attributes.set(EAttribute.CRITDMG, this.critDamage);

    // this.damage = Attribute.create(10, 0);
    // watchEffect(() =>
    //   this.damage.setBaseAttributeIncrement(
    //     Math.max(
    //       this.strength.result,
    //       this.agility.result,
    //       this.intelligence.result,
    //     ),
    //   ),
    // );
    // this.attributes.set(EAttribute.DMG, this.damage);

    // this.DPS = computed(
    //   () => this.damage.result * (1 / this.attackCooldown.value),
    // );

    // this.CritDPS = computed(() => {
    //   return (
    //     this.DPS.value +
    //     this.DPS.value *
    //       ((this.critChance.result / 100) * (this.critDamage.result - 1))
    //   );
    // });

    this.baseAttributes = new Map<EAttribute, number>();
    this.baseAttributes.set(EAttribute.STRENGTH, 10);
    this.baseAttributes.set(EAttribute.HEALTH, 100);

    this.baseAttributes.set(EAttribute.AGILITY, 10);
    this.baseAttributes.set(EAttribute.ARMOR, 5);
    this.baseAttributes.set(EAttribute.ATTACKSPEED, 1);

    this.baseAttributes.set(EAttribute.INTELLIGENCE, 10);
    this.baseAttributes.set(EAttribute.MANA, 100);

    this.baseAttributes.set(EAttribute.CRITCHANCE, 10);
    this.baseAttributes.set(EAttribute.CRITDMG, 2);
    this.baseAttributes.set(EAttribute.DMG, 10);
  }

  /** This function allows us to create reactive instances of this class */
  public static create() {
    return shallowReactive(new Player());
  }

  public get currentModifiers() {
    const modifiers: ShallowReactive<AttributeModifier[]> = shallowReactive([]);
    for (const item of this.inventory.items) {
      modifiers.push(...item.attributes);
    }
    console.log(modifiers);
    return modifiers;
  }

  public get resultingAttributes() {
    const result = new Map<EAttribute, number>();

    for (const [attribute, baseValue] of this.baseAttributes) {
      const modifiers = this.findRelevantModifiers(
        attribute,
        this.currentModifiers,
      );
      result.set(
        attribute,
        this.calculateResultingAttribute(baseValue, modifiers),
      );
    }

    this.changeDependentStats(result);

    return result;
  }

  public get attackCooldown() {
    // const attackSpeed = this.resultingAttributes.get(EAttribute.ATTACKSPEED);
    // if (attackSpeed === undefined) return 1;
    // return 1 / attackSpeed;

    return 1 / (this.resultingAttributes.get(EAttribute.ATTACKSPEED) ?? 1);
  }

  public get dps() {
    return (
      (this.resultingAttributes.get(EAttribute.DMG) ?? 0) *
      (1 / this.attackCooldown)
    );
  }

  public get critDps() {
    const critChance = this.resultingAttributes.get(EAttribute.CRITCHANCE) ?? 0;
    const critDamage = this.resultingAttributes.get(EAttribute.CRITDMG) ?? 0;
    return this.dps + this.dps * ((critChance / 100) * (critDamage - 1));
  }

  private changeDependentStats(modifiedAttributes: Map<EAttribute, number>) {
    this.modifyHealth(modifiedAttributes);
    this.modifyMana(modifiedAttributes);
    this.modifyArmor(modifiedAttributes);
    this.modifyAttackSpeed(modifiedAttributes);
    this.modifyDamage(modifiedAttributes);
  }

  private modifyHealth(modifiedAttributes: Map<EAttribute, number>) {
    const hp = modifiedAttributes.get(EAttribute.HEALTH);
    const str = modifiedAttributes.get(EAttribute.STRENGTH);
    if (hp === undefined || str === undefined) return;
    modifiedAttributes.set(EAttribute.HEALTH, hp + str * 6);
  }

  private modifyMana(modifiedAttributes: Map<EAttribute, number>) {
    const mp = modifiedAttributes.get(EAttribute.MANA);
    const int = modifiedAttributes.get(EAttribute.INTELLIGENCE);
    if (mp === undefined || int === undefined) return;
    modifiedAttributes.set(EAttribute.MANA, mp + int * 6);
  }

  private modifyArmor(modifiedAttributes: Map<EAttribute, number>) {
    const armor = modifiedAttributes.get(EAttribute.ARMOR);
    const agi = modifiedAttributes.get(EAttribute.AGILITY);
    if (armor === undefined || agi === undefined) return;
    modifiedAttributes.set(EAttribute.ARMOR, armor + agi * 0.2);
  }

  private modifyAttackSpeed(modifiedAttributes: Map<EAttribute, number>) {
    const attackSpeed = modifiedAttributes.get(EAttribute.ATTACKSPEED);
    const agi = modifiedAttributes.get(EAttribute.AGILITY);
    if (attackSpeed === undefined || agi === undefined) return;
    modifiedAttributes.set(EAttribute.ATTACKSPEED, attackSpeed + agi * 0.05);
  }

  private modifyDamage(modifiedAttributes: Map<EAttribute, number>) {
    const dmg = modifiedAttributes.get(EAttribute.DMG);
    const int = modifiedAttributes.get(EAttribute.INTELLIGENCE);
    const agi = modifiedAttributes.get(EAttribute.AGILITY);
    const str = modifiedAttributes.get(EAttribute.STRENGTH);
    if (
      dmg === undefined ||
      agi === undefined ||
      str === undefined ||
      int === undefined
    )
      return;
    modifiedAttributes.set(EAttribute.DMG, dmg + Math.max(int, str, agi));
  }

  private findRelevantModifiers(
    attribute: EAttribute,
    attributeModifiers: ShallowReactive<AttributeModifier[]>, // TODO: Probably should remove it somehow
  ): AttributeModifier[] {
    const modifiers: AttributeModifier[] = [];
    for (const modifier of attributeModifiers) {
      if (modifier.attribute === attribute) modifiers.push(modifier);
    }

    return modifiers;
  }

  private calculateResultingAttribute(
    base: number,
    modifiers: AttributeModifier[],
  ) {
    const additions: number[] = [];
    const percentages: number[] = [];
    const multipliers: number[] = [];
    for (const modifier of modifiers) {
      switch (modifier.modifierType) {
        case EModifierType.INCREASE:
          additions.push(modifier.value);
          break;

        case EModifierType.PERCENTAGE:
          percentages.push(modifier.value);
          break;

        case EModifierType.MULTIPLIER:
          multipliers.push(modifier.value);
          break;
      }
    }
    let result = base;
    result += additions.reduce((a, b) => a + b, 0);
    result += result * (percentages.reduce((a, b) => a + b, 0) / 100);
    result *= multipliers.reduce((a, b) => a * b, 1);
    return result;
  }
}
