export class Attribute {
  private _result: number;
  public baseStat: number;
  public numberIncrease: number;
  public percentageIcrease: number;
  public multiplyer: number;

  constructor(baseStat: number) {
    this.baseStat = baseStat;
    this.numberIncrease = 0;
    this.percentageIcrease = 0;
    this.multiplyer = 1;
    this._result = this.calculateResult();
  }

  private calculateResult() {
    let result = this.baseStat;
    result += this.numberIncrease;
    result += result * (this.percentageIcrease / 100);
    result *= this.multiplyer;
    result = +result.toFixed(1);
    console.log(result);
    return result;
  }

  get result(): number {
    this._result = this.calculateResult();
    return this._result;
  }
}
