import { Email, Password, UserId, Username } from "../value_object";


export class User {
  private readonly userId: UserId;
  private readonly username: Username;
  private readonly email: Email;
  private readonly password: Password;

  constructor(
    userId: string,
    username: string,
    email: string,
    password: string
  ) {
    this.userId = new UserId(userId);
    this.username = new Username(username);
    this.email = new Email(email);
    this.password = new Password(password);
  }

  // getter
  public getUserId(): string {
    return this.userId.value;
  }

  public getUsername(): string {
    return this.username.getValue();
  }

  public getEmail(): string {
    return this.email.getEmail();
  }

  public getPassword(): string {
    return this.password.getValue();
  }

}