import { Email, Password, UserId, Username } from "../value_object";


export class User {
  private readonly userId: UserId;
  private readonly username: Username;
  private readonly email: Email;
  private readonly password: Password;

  constructor(
    userId: UserId,
    username: Username,
    email: Email,
    password: Password
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
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

  public getPassword(): Password {
    return this.password;
  }

}
