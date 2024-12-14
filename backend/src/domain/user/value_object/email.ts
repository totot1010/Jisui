class Email {
  private readonly email: string;

  constructor(email: string) {
    this.__validate(email);
    this.email = email;
  }

  private __validate(email: string) {
    if (email.length < 3) {
      throw new Error('メールアドレスは3文字以上にしてください');
    }

    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      throw new Error('メールアドレスの形式が正しくありません');
    }
  }

  public getEmail(): string {
    return this.email;
  }
}