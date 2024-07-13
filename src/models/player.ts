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

    this.strength = Attribute.create(10, this.currentModifiers, 0) as Attribute;
    this.attributes.set(EAttribute.STRENGTH, this.strength);

    this.health = Attribute.create(100, this.currentModifiers, 1) as Attribute;
    watchEffect(() =>
      this.health.setBaseAttributeIncrement(this.strength.result * 6),
    );
    this.attributes.set(EAttribute.HEALTH, this.health);

    this.agility = Attribute.create(10, this.currentModifiers, 0) as Attribute;
    this.attributes.set(EAttribute.AGILITY, this.agility);

    this.armor = Attribute.create(5, this.currentModifiers) as Attribute;
    watchEffect(() =>
      this.armor.setBaseAttributeIncrement(this.agility.result * 0.2),
    );
    this.attributes.set(EAttribute.ARMOR, this.armor);

    this.attackSpeed = Attribute.create(
      1,
      this.currentModifiers,
      0.1,
    ) as Attribute;
    watchEffect(() =>
      this.attackSpeed.setBaseAttributeIncrement(this.agility.result * 0.2),
    );
    this.attributes.set(EAttribute.ATTACKSPEED, this.attackSpeed);
    this.attackCooldown = computed(() => 1 / this.attackSpeed.result);

    this.intelligence = Attribute.create(
      10,
      this.currentModifiers,
      0,
    ) as Attribute;
    this.attributes.set(EAttribute.INTELLIGENCE, this.intelligence);

    this.mana = Attribute.create(100, this.currentModifiers, 0) as Attribute;
    watchEffect(() =>
      this.mana.setBaseAttributeIncrement(this.intelligence.result * 6),
    );
    this.attributes.set(EAttribute.MANA, this.mana);

    this.critChance = Attribute.create(
      10,
      this.currentModifiers,
      0,
      100,
    ) as Attribute;
    this.attributes.set(EAttribute.CRITCHANCE, this.critChance);

    this.critDamage = Attribute.create(
      2,
      this.currentModifiers,
      1,
    ) as Attribute;
    this.attributes.set(EAttribute.CRITDMG, this.critDamage);

    this.damage = Attribute.create(10, this.currentModifiers, 0) as Attribute;
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

    this.clearStats();
    modifiers.forEach(modifier => {
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
    // console.log(modifiers);

    return shallowReactive(modifiers);
  }

  private clearStats() {
    this.attributes.forEach(attribute => {
      attribute.numberIncreases.length = 0;
      attribute.percentageIncreases.length = 0;
      attribute.multipliers.length = 0;
    });
  }

  public static create() {
    return shallowReactive(new Player());
  }
}
