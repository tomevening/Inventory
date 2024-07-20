import { reactive } from 'vue';

/** Instances of this class are attributes like Strength, Damage, or Crit chance. */

export class Attribute {
  private constructor(
    baseStat: number,
    /** Some stats can't go lower than 1 or 0 (like HP) */
    public readonly minCap?: number,
    /** Some stats can't go higher than 100 (like crit chance) */
    public readonly maxCap?: number,
    public readonly originalBaseStat: number = baseStat,
    public readonly numberIncreases: number[] = [],
    public readonly percentageIncreases: number[] = [],
    public readonly multipliers: number[] = [],
  ) {
    this._baseStat = baseStat;
    this.minCap = minCap;
    this.maxCap = maxCap;
  }

  private _baseStat: number;

  public get baseStat() {
    return this._baseStat;
  }

  /** This function allows us to create reactive instances of this class */
  public static create(baseStat: number, minCap?: number, maxCap?: number) {
    return reactive(new Attribute(baseStat, minCap, maxCap));
  }

  public get result(): number {
    let result = this._baseStat;
    result += this.calculateNumberIncrease();
    result += result * (this.calculatePercentageIncrease() / 100);
    result *= this.calculateMultipliers();

    if (this.minCap !== undefined && result < this.minCap) return this.minCap;
    if (this.maxCap !== undefined && result > this.maxCap) return this.maxCap;

    return result;
  }

  /** Some attributes are increased alongsides others (increasing strngth also increases HP and so on)*/
  public setBaseAttributeIncrement(increment: number) {
    this._baseStat = this.originalBaseStat + increment;
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
