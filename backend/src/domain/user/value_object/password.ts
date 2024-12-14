class Password {
  private readonly value: string;

  constructor(value: string) {
    this.__validate(value);
    this.value = value;
  }

  private __validate(value: string) {
    if (value.length < 8) {
      throw new Error('パスワードは8文字以上にしてください');
    }
  }

  public getValue(): string {
    return this.value;
  }

  public static hash(rawPassword: string) {
    // TODO: ハッシュ化処理を実装
  }

  public equals(value: string) {
    // TODO: ハッシュ化されたパスワードを比較する処理を実装
    return this.value === value;
  }
}