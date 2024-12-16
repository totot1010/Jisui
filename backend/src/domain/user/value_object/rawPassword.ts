export class RawPassword {
  private readonly __value: string;

  constructor(value: string) {
    this.__validate(value);
    this.__value = value;
  }

  private __validate(value: string) {
    if (value.length < 8) {
      throw new Error('パスワードは8文字以上にしてください');
    }
  }

  get value(): string {
    return this.__value;
  }

}