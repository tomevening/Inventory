import { reactive } from 'vue';

export class Attribute {
  // private _result: number;
  public baseStat: number;
  public numberIncrease: number;
  public percentageIcrease: number;
  public multiplier: number;

  private constructor(baseStat: number) {
    this.baseStat = baseStat;
    this.numberIncrease = 0;
    this.percentageIcrease = 0;
    this.multiplier = 1;
  }

  public get result(): number {
    let result = this.baseStat;
    result += this.numberIncrease;
    result += result * (this.percentageIcrease / 100);
    result *= this.multiplier;
    result = +result.toFixed(1);
    console.log(result);
    return result;
  }

  public static create(baseStat: number) {
    const instance = new Attribute(baseStat);
    return reactive(instance);
  }
}
