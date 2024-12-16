import { Email, HashedPassword, UserId, Username } from "../value_object";


export class User {
  private readonly userId: UserId;
  private readonly username: Username;
  private readonly email: Email;
  private readonly hashedPassword: HashedPassword;

  constructor(
    userId: UserId,
    username: Username,
    email: Email,
    password: HashedPassword
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.hashedPassword = password;
  }

  // 永続化層から取得したデータをエンティティに変換する際に使用
  public static reConstruct(
    userId: string,
    username: string,
    email: string,
    hashedPassword: string
  ): User {
    return new User(
      new UserId(userId),
      new Username(username),
      new Email(email),
      new HashedPassword(hashedPassword)
    );
  }
  // getter
  public getUserId(): UserId {
    return this.userId;
  }

  public getUsername(): Username {
    return this.username;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getHashedPassword(): HashedPassword {
    return this.hashedPassword;
  }

}
