export class Title {
  private readonly __value: string;

  constructor(value: string) {
    this.__validate(value);
    this.__value = value;
  }

  private __validate(value: string) {
    if (value.length < 1) {
      throw new Error('タイトル1文字以上にしてください');
    }

    if (value.length >= 50) {
      throw new Error('タイトルは100文字以下にしてください');
    }
  }

  get value(): string {
    return this.__value;
  }
}