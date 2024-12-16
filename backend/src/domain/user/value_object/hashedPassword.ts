import bcrypt from 'bcrypt';

import { RawPassword } from "./rawPassword";

export class HashedPassword {
  private readonly __value: string;

  constructor(value: string) {
    this.__value = value;
  }
  get value(): string {
    return this.__value;
  }

  public static async hash(rawPassword: RawPassword): Promise<HashedPassword> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(rawPassword.value, salt);
    return new HashedPassword(hashedPassword);
  }

  public equals(hashedPassword: HashedPassword) {
    // TODO: ハッシュ化されたパスワードを比較する処理を実装
    return this.value === hashedPassword.value;
  }
}
