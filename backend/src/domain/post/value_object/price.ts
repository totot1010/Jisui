export class Price {
  private readonly __value: number;

  constructor(value: number) {
    this.__validate(value);
    this.__value = value;
  }

  private __validate(value: number) {
    if (value < 0) {
      throw new Error('価格は0円以上にしてください');
    }

    if (value >= 1000000) {
      throw new Error('価格は1000000円未満にしてください');
    }
  }

  get value(): number {
    return this.__value;
  }
}