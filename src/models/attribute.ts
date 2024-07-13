import { ShallowReactive, reactive } from 'vue';
import { AttributeModifier } from '.';

export class Attribute {
  public baseStat: number;
  public readonly originalBaseStat: number;
  public numberIncreases: number[];
  public percentageIncreases: number[];
  public multipliers: number[];
  public readonly modifiers: ShallowReactive<AttributeModifier[]>;
  public minCap?: number;
  public maxCap?: number;

  private constructor(
    baseStat: number,
    modifiers: ShallowReactive<AttributeModifier[]>,
    minCap?: number,
    maxCap?: number,
  ) {
    this.baseStat = baseStat;
    this.originalBaseStat = baseStat;
    this.numberIncreases = [];
    this.percentageIncreases = [];
    this.multipliers = [];
    this.modifiers = modifiers;
    this.minCap = minCap;
    this.maxCap = maxCap;
  }

  public get result(): number {
    let result = this.baseStat;
    result += this.calculateNumberIncrease();
    result += result * (this.calculatePercentageIncrease() / 100);
    result *= this.calculateMultipliers();

    if (this.minCap !== undefined && result < this.minCap) return this.minCap;
    if (this.maxCap !== undefined && result > this.maxCap) return this.maxCap;

    return result;
  }

  public static create(
    baseStat: number,
    modifiers: ShallowReactive<AttributeModifier[]>,
    minCap?: number,
    maxCap?: number,
  ) {
    const instance = new Attribute(baseStat, modifiers, minCap, maxCap);
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
