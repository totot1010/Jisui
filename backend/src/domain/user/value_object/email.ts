export class Email {
  private readonly __email: string;

  constructor(email: string) {
    this.__validate(email);
    this.__email = email;
  }

  private __validate(email: string) {
    if (email.length < 3) {
      throw new Error('メールアドレスは3文字以上にしてください');
    }

    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      throw new Error('メールアドレスの形式が正しくありません');
    }
  }

  get value(): string {
    return this.__email;
  }
}