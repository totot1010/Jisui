export class Password {
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

  public static hash(rawPassword: string) {
    // TODO: ハッシュ化処理を実装
  }

  public equals(value: string) {
    // TODO: ハッシュ化されたパスワードを比較する処理を実装
    return this.__value === value;
  }
}