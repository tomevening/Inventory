import { EAttribute } from '@/enums';
import { AttributeModifier } from '@/models';
import { Attribute, BaseAttribute } from '@/types';

import {
  ShallowReactive,
  ShallowRef,
  computed,
  shallowReactive,
  shallowRef,
} from 'vue';

import { useModifyAttribute } from '@/composables';
import { Inventory } from './inventory';

const MAX_INVENTORY_SIZE = 6;

export class Player {
  public readonly inventory = new Inventory(MAX_INVENTORY_SIZE);
  public currentGold: ShallowRef<number>;

  public readonly baseStrength: ShallowReactive<BaseAttribute>;
  public readonly baseHealth: ShallowReactive<BaseAttribute>;
  public readonly baseAgility: ShallowReactive<BaseAttribute>;
  public readonly baseIntelligence: ShallowReactive<BaseAttribute>;
  public readonly baseMana: ShallowReactive<BaseAttribute>;
  public readonly baseArmor: ShallowReactive<BaseAttribute>;
  public readonly baseAttackSpeed: ShallowReactive<BaseAttribute>;
  public readonly baseCritChance: ShallowReactive<BaseAttribute>;
  public readonly baseCritDamage: ShallowReactive<BaseAttribute>;
  public readonly baseDamage: ShallowReactive<BaseAttribute>;

  public readonly strength: Attribute;
  public readonly health: Attribute;
  public readonly agility: Attribute;
  public readonly intelligence: Attribute;
  public readonly mana: Attribute;
  public readonly armor: Attribute;
  public readonly attackSpeed: Attribute;
  public readonly critChance: Attribute;
  public readonly critDamage: Attribute;
  public readonly damage: Attribute;

  private constructor() {
    this.currentGold = shallowRef(1500);

    this.baseAgility = shallowReactive({
      value: 10,
      type: EAttribute.AGILITY,
      minCap: 1,
    });
    this.agility = useModifyAttribute(this.baseAgility, this.currentModifiers);

    this.baseIntelligence = shallowReactive({
      value: 10,
      type: EAttribute.INTELLIGENCE,
      minCap: 1,
    });
    this.intelligence = useModifyAttribute(
      this.baseIntelligence,
      this.currentModifiers,
    );

    this.baseMana = shallowReactive({
      value: () => 100 + this.intelligence.value.attribute * 6,
      type: EAttribute.MANA,
      minCap: 0,
    });
    this.mana = useModifyAttribute(this.baseMana, this.currentModifiers);

    this.baseStrength = shallowReactive({
      value: 10,
      type: EAttribute.STRENGTH,
      minCap: 1,
    });
    this.strength = useModifyAttribute(
      this.baseStrength,
      this.currentModifiers,
    );

    this.baseHealth = shallowReactive({
      value: () => 100 + this.strength.value.attribute * 6,
      type: EAttribute.HEALTH,
      minCap: 1,
    });
    this.health = useModifyAttribute(this.baseHealth, this.currentModifiers);

    this.baseArmor = shallowReactive({
      value: () => 5 + this.agility.value.attribute * 0.2,
      type: EAttribute.ARMOR,
    });
    this.armor = useModifyAttribute(this.baseArmor, this.currentModifiers);

    this.baseAttackSpeed = shallowReactive({
      value: () => 1 + this.agility.value.attribute * 0.01,
      type: EAttribute.ATTACKSPEED,
      minCap: 0.01,
    });
    this.attackSpeed = useModifyAttribute(
      this.baseAttackSpeed,
      this.currentModifiers,
    );

    this.baseCritChance = shallowReactive({
      value: 10,
      type: EAttribute.CRITCHANCE,
      minCap: 0,
      maxCap: 100,
    });
    this.critChance = useModifyAttribute(
      this.baseCritChance,
      this.currentModifiers,
    );

    this.baseCritDamage = shallowReactive({
      value: 2,
      type: EAttribute.CRITDMG,
      minCap: 1,
    });
    this.critDamage = useModifyAttribute(
      this.baseCritChance,
      this.currentModifiers,
    );

    this.baseDamage = shallowReactive({
      value: () =>
        10 +
        Math.max(
          this.agility.value.attribute,
          this.strength.value.attribute,
          this.intelligence.value.attribute,
        ),
      type: EAttribute.DMG,
      minCap: 0,
    });
    this.damage = useModifyAttribute(this.baseDamage, this.currentModifiers);
  }

  /** Creates reactive instances of this class */
  public static create() {
    return shallowReactive(new Player());
  }

  /** DPS - damage per second. */
  public get dps() {
    return this.damage.value.attribute * (1 / this.attackCooldown);
  }

  /** DPS with criticals */
  public get critDps() {
    const critChance = this.critChance.value.attribute;
    const critDamage = this.critDamage.value.attribute;
    return this.dps + this.dps * ((critChance / 100) * (critDamage - 1));
  }

  public get attackCooldown() {
    return 1 / this.attackSpeed.value.attribute;
  }

  public readonly currentModifiers = computed(() => {
    const modifiers: AttributeModifier[] = [];
    for (const item of this.inventory.items) {
      modifiers.push(...item.attributes);
    }
    console.log('Getter');
    return modifiers;
  });
}
