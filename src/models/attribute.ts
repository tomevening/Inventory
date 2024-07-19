import { reactive } from 'vue';

/** Instances of this class are attributes like Strength, Damage, or Crit chance. */

export class Attribute {
  public baseStat: number;
  public readonly originalBaseStat: number;
  public readonly numberIncreases: number[];
  public readonly percentageIncreases: number[];
  public readonly multipliers: number[];
  /** Some stats can't go lower than 1 or 0 (like HP) */
  public readonly minCap?: number;
  /** Some stats can't go higher than 100 (like crit chance) */
  public readonly maxCap?: number;

  private constructor(baseStat: number, minCap?: number, maxCap?: number) {
    this.baseStat = baseStat;
    this.originalBaseStat = baseStat;
    this.numberIncreases = [];
    this.percentageIncreases = [];
    this.multipliers = [];
    this.minCap = minCap;
    this.maxCap = maxCap;
  }

  /** This function allows us to create reactive instances of this class */
  public static create(baseStat: number, minCap?: number, maxCap?: number) {
    return reactive(new Attribute(baseStat, minCap, maxCap));
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

  /** Some attributes are increased alongsides others (increasing strngth also increases HP and so on)*/
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
