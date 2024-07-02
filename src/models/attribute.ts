import { reactive } from 'vue';

export class Attribute {
  public baseStat: number;
  public readonly originalBaseStat: number;
  public numberIncreases: number[];
  public percentageIncreases: number[];
  public multipliers: number[];

  private constructor(baseStat: number) {
    this.baseStat = baseStat;
    this.originalBaseStat = baseStat;
    this.numberIncreases = [];
    this.percentageIncreases = [];
    this.multipliers = [];
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

  public static create(baseStat: number) {
    const instance = new Attribute(baseStat);
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
