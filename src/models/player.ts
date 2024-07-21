import { EAttribute, EModifierType } from '@/enums';
import { Attribute } from '@/models';
import {
  ComputedRef,
  Reactive,
  computed,
  reactive,
  shallowReactive,
  shallowRef,
  watchEffect,
} from 'vue';
import { AttributeModifier } from '.';
import { Inventory } from './inventory';

const MAX_INVENTORY_SIZE = 6;
export class Player {
  public readonly strength: Reactive<Attribute>;
  public readonly health: Reactive<Attribute>;
  public readonly agility: Reactive<Attribute>;
  public readonly armor: Reactive<Attribute>;
  public readonly attackSpeed: Reactive<Attribute>;
  public readonly intelligence: Reactive<Attribute>;
  public readonly mana: Reactive<Attribute>;
  public readonly critChance: Reactive<Attribute>;
  public readonly critDamage: Reactive<Attribute>;
  public readonly damage: Reactive<Attribute>;
  /**  Damage per second is not a full-fledged attribute, it is calculated based on dmg and AS */
  public readonly DPS: ComputedRef<number>;
  public readonly CritDPS: ComputedRef<number>;
  public readonly attackCooldown: ComputedRef<number>;
  // public readonly attributes: Map<EAttribute, Attribute>;

  public readonly inventory = new Inventory(MAX_INVENTORY_SIZE);

  public readonly attributes = reactive(
    new Map<EAttribute, Reactive<Attribute>>(),
  );
  public readonly currentGold;

  private constructor() {
    // this.attributes = new Map<EAttribute, Attribute>();  TODO: return if reactivity is not needed

    this.currentGold = shallowRef(1500);

    this.strength = Attribute.create(10, 0);
    this.attributes.set(EAttribute.STRENGTH, this.strength);

    this.health = Attribute.create(100, 1);
    watchEffect(() =>
      this.health.setBaseAttributeIncrement(this.strength.result * 6),
    );
    this.attributes.set(EAttribute.HEALTH, this.health);

    this.agility = Attribute.create(10, 0);
    this.attributes.set(EAttribute.AGILITY, this.agility);

    this.armor = Attribute.create(5);
    watchEffect(() =>
      this.armor.setBaseAttributeIncrement(this.agility.result * 0.2),
    );
    this.attributes.set(EAttribute.ARMOR, this.armor);

    this.attackSpeed = Attribute.create(1, 0.1);
    watchEffect(() =>
      this.attackSpeed.setBaseAttributeIncrement(this.agility.result * 0.2),
    );
    this.attributes.set(EAttribute.ATTACKSPEED, this.attackSpeed);
    this.attackCooldown = computed(() => 1 / this.attackSpeed.result);

    this.intelligence = Attribute.create(10, 0);
    this.attributes.set(EAttribute.INTELLIGENCE, this.intelligence);

    this.mana = Attribute.create(100, 0);
    watchEffect(() =>
      this.mana.setBaseAttributeIncrement(this.intelligence.result * 6),
    );
    this.attributes.set(EAttribute.MANA, this.mana);

    this.critChance = Attribute.create(10, 0, 100);
    this.attributes.set(EAttribute.CRITCHANCE, this.critChance);

    this.critDamage = Attribute.create(2, 1);
    this.attributes.set(EAttribute.CRITDMG, this.critDamage);

    this.damage = Attribute.create(10, 0);
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

  /** This function allows us to create reactive instances of this class */
  public static create() {
    return shallowReactive(new Player());
  }

  /**  Gather and return all the attribute modifications from equipped items */
  public get currentModifiers() {
    const modifiers: AttributeModifier[] = [];
    for (const item of this.inventory.items) {
      modifiers.push(...item.attributes);
    }

    this.clearStats();
    for (const modifier of modifiers) {
      const attributeToChange = this.attributes.get(modifier.attribute);
      if (!attributeToChange) continue;
      switch (modifier.modifierType) {
        case EModifierType.INCREASE:
          attributeToChange.numberIncreases.push(modifier.value);
          break;

        case EModifierType.PERCENTAGE:
          attributeToChange.percentageIncreases.push(modifier.value);
          break;

        case EModifierType.MULTIPLIER:
          attributeToChange.multipliers.push(modifier.value);
          break;
      }
    }

    return shallowReactive(modifiers);
  }

  private clearStats() {
    for (const attribute of this.attributes.values()) {
      attribute.numberIncreases.length = 0;
      attribute.percentageIncreases.length = 0;
      attribute.multipliers.length = 0;
    }
  }
}
