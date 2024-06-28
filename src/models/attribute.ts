import { reactive } from 'vue';

export class Attribute {
  // private _result: number;
  public baseStat: number;
  public readonly originalBaseStat: number;
  public numberIncreases: number[];
  // public numberIncrease: number;
  public percentageIncreases: number[];
  // public percentageIcrease: number;
  public multipliers: number[];
  // public multiplier: number;

  private constructor(baseStat: number) {
    this.baseStat = baseStat;
    this.originalBaseStat = baseStat;
    this.numberIncreases = [];
    // this.numberIncrease = 0;
    this.percentageIncreases = [];
    // this.percentageIcrease = 0;
    this.multipliers = [];
    // this.multiplier = 1;
  }

  public get result(): number {
    let result = this.baseStat;
    // result += this.numberIncrease;
    // result += result * (this.percentageIcrease / 100);
    // result *= this.multiplier;

    result += this.calculateNumberIncrease();
    result += result * (this.calculatePercentageIncrease() / 100);
    result *= this.calculateMultipliers();

    result = +result.toFixed(1);
    console.log(result);
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
