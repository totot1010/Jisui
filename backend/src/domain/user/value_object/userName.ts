export class Username {
  private readonly __value: string;

  constructor(value: string) {
    this.__validate(value);
    this.__value = value;
  }

  private __validate(value: string) {
    if (value.length < 3) {
      throw new Error('ユーザー名は3文字以上にしてください');
    }

    if (value.length >= 50) {
      throw new Error('ユーザー名は50文字以下にしてください');
    }
  }

  get value(): string {
    return this.__value;
  }
}