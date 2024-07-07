import { ShallowReactive, reactive } from 'vue';
import { AttributeModifier } from '.';

export class Attribute {
  public baseStat: number;
  public readonly originalBaseStat: number;
  public numberIncreases: number[];
  public percentageIncreases: number[];
  public multipliers: number[];
  public readonly modifiers: ShallowReactive<AttributeModifier[]>;

  private constructor(
    baseStat: number,
    modifiers: ShallowReactive<AttributeModifier[]>,
  ) {
    this.baseStat = baseStat;
    this.originalBaseStat = baseStat;
    this.numberIncreases = [];
    this.percentageIncreases = [];
    this.multipliers = [];
    this.modifiers = modifiers;

    // watch(
    //   modifiers,
    //   () => {
    //     // TODO: simplified temporary code
    //     console.log('1');
    //     const increases: number[] = [];
    //     modifiers.forEach(modifier => {
    //       if (modifier.attribute === EAttribute.STRENGTH) {
    //         if (modifier.modifierType === EModifierType.INCREASE) {
    //           increases.push(modifier.value);
    //           console.log('2');
    //         }
    //       }
    //     });
    //     this.numberIncreases = increases;
    //   },
    //   { deep: true, immediate: true },
    // );
  }

  public get result(): number {
    let result = this.baseStat;
    result += this.calculateNumberIncrease();
    result += result * (this.calculatePercentageIncrease() / 100);
    result *= this.calculateMultipliers();

    // result = +result.toFixed(1);
    // console.log(result);
    return result;
  }

  public static create(
    baseStat: number,
    modifiers: ShallowReactive<AttributeModifier[]>,
  ) {
    const instance = new Attribute(baseStat, modifiers);
    return reactive(instance);
  }

  public setBaseAttributeIncrement(increment: number) {
    this.baseStat = this.originalBaseStat + increment;
  }

  private calculateNumberIncrease() {
    return this.numberIncreases.reduce((a, b) => a + b, 0);
  }

  private calculatePercentageIncrease() {
    return this.percentageIncreases.reduce((a, b) => a + b, 0);
  }

  private calculateMultipliers() {
    return this.multipliers.reduce((a, b) => a * b, 1);
  }
}
