// import { AttributeModifier } from '@/types';
import { ComputedRef, shallowReactive } from 'vue';
import { AttributeModifier, Item, Product, Recipe } from '.';

import { EAttribute, EModifierType } from '@/enums';
import { Attribute } from '@/models';
import { computed, watchEffect } from 'vue';

export class Player {
  public readonly strength: Attribute;
  public readonly health: Attribute;
  public readonly agility: Attribute;
  public readonly armor: Attribute;
  public readonly attackSpeed: Attribute;
  public readonly intelligence: Attribute;
  public readonly mana: Attribute;
  public readonly critChance: Attribute;
  public readonly critDamage: Attribute;
  public readonly damage: Attribute;
  public readonly DPS: ComputedRef<number>;
  public readonly CritDPS: ComputedRef<number>;
  public readonly attackCooldown: ComputedRef<number>;
  public readonly attributes: Map<EAttribute, Attribute>;

  public readonly inventory = shallowReactive<Product<Item | Recipe>[]>([]);

  private constructor() {
    this.attributes = new Map<EAttribute, Attribute>();

    this.strength = Attribute.create(10, this.currentModifiers) as Attribute;
    // this.strength.percentageIncreases.push(26.001);
    // this.strength.percentageIncreases.push(25);
    this.attributes.set(EAttribute.STRENGTH, this.strength);

    this.health = Attribute.create(100, this.currentModifiers) as Attribute;
    watchEffect(() =>
      this.health.setBaseAttributeIncrement(this.strength.result * 6),
    );
    this.attributes.set(EAttribute.HEALTH, this.health);

    this.agility = Attribute.create(10, this.currentModifiers) as Attribute;
    this.attributes.set(EAttribute.AGILITY, this.agility);

    this.armor = Attribute.create(5, this.currentModifiers) as Attribute;
    watchEffect(() =>
      this.armor.setBaseAttributeIncrement(this.agility.result * 0.2),
    );
    this.attributes.set(EAttribute.ARMOR, this.armor);

    this.attackSpeed = Attribute.create(2, this.currentModifiers) as Attribute;
    watchEffect(() =>
      this.attackSpeed.setBaseAttributeIncrement(this.agility.result * 0.2),
    );
    this.attributes.set(EAttribute.ATTACKSPEED, this.attackSpeed);
    this.attackCooldown = computed(() => 1 / this.attackSpeed.result);

    this.intelligence = Attribute.create(
      10,
      this.currentModifiers,
    ) as Attribute;
    this.attributes.set(EAttribute.INTELLIGENCE, this.intelligence);

    this.mana = Attribute.create(100, this.currentModifiers) as Attribute;
    watchEffect(() =>
      this.mana.setBaseAttributeIncrement(this.intelligence.result * 6),
    );
    this.attributes.set(EAttribute.MANA, this.mana);

    this.critChance = Attribute.create(10, this.currentModifiers) as Attribute;
    this.attributes.set(EAttribute.CRITCHANCE, this.critChance);

    this.critDamage = Attribute.create(2, this.currentModifiers) as Attribute;
    this.attributes.set(EAttribute.CRITDMG, this.critDamage);

    this.damage = Attribute.create(10, this.currentModifiers) as Attribute;
    watchEffect(() =>
      this.damage.setBaseAttributeIncrement(
        Math.max(
          this.strength.result,
          this.agility.result,
          this.intelligence.result,
        ),
      ),
    );
    this.attributes.set(EAttribute.DMG, this.damage);

    this.DPS = computed(
      () => this.damage.result * (1 / this.attackCooldown.value),
    );

    this.CritDPS = computed(() => {
      return (
        this.DPS.value +
        this.DPS.value *
          ((this.critChance.result / 100) * (this.critDamage.result - 1))
      );
    });
  }

  public get currentModifiers() {
    const modifiers: AttributeModifier[] = [];
    for (const item of this.inventory) {
      modifiers.push(...item.attributes);
    }
    return shallowReactive(modifiers);
  }

  public static create() {
    return shallowReactive(new Player());
  }

  public applyStats() {
    this.clearStats();
    // const increases: number[] = [];
    this.currentModifiers.forEach(modifier => {
      // const attributeName = modifier.attribute;
      const attributeToChange = this.attributes.get(modifier.attribute);
      switch (modifier.modifierType) {
        case EModifierType.INCREASE:
          attributeToChange?.numberIncreases.push(modifier.value);
          break;

        case EModifierType.PERCENTAGE:
          attributeToChange?.percentageIncreases.push(modifier.value);
          break;

        case EModifierType.MULTIPLIER:
          attributeToChange?.multipliers.push(modifier.value);
          break;
      }
    });
  }

  private clearStats() {
    this.attributes.forEach(attribute => {
      attribute.numberIncreases.length = 0;
      attribute.percentageIncreases.length = 0;
      attribute.multipliers.length = 0;
    });
  }
}

// export class Player {
//   public readonly inventory;
//   public readonly currentModifiers;

//   private constructor() {
//     this.inventory = shallowReactive<Product<Item | Recipe>[]>([]);

//     this.currentModifiers = computed(() => {
//       const modifiers = shallowReactive<AttributeModifier[]>([]);
//       for (const item of this.inventory) {
//         modifiers.push(...item.attributes);
//       }
//       return modifiers;
//     });
//   }

//   public static create() {
//     const instance = new Player();
//     return shallowReactive(instance);
//   }
// }
