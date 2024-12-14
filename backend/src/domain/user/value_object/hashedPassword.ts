import { RawPassword } from "./rawPassword";

export class HashedPassword {
  private readonly __value: string;

  constructor(value: string) {
    this.__value = value;
  }
  get value(): string {
    return this.__value;
  }

  public static hash(rawPassword: RawPassword): HashedPassword {
    // TODO: パスワードをハッシュ化する処理を実装
    return new HashedPassword(rawPassword.value);
  }

  public equals(hashedPassword: HashedPassword) {
    // TODO: ハッシュ化されたパスワードを比較する処理を実装
    return this.value === hashedPassword.value;
  }
}