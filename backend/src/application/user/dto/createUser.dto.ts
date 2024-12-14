export class CreateUserRequestDto {
  public readonly email: string;
  public readonly username: string;
  public readonly password: string;

  constructor(
    email: string,
    username: string,
    password: string
  ) {
    if (!email || !username || !password) {
      throw new Error("Invalid request body");
    }
    this.email = email;
    this.username = username;
    this.password = password;
  }

};