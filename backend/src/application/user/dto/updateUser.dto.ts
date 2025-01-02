export class UpdateUserRequestDto {
  public readonly userId: string;
  public readonly email: string;
  public readonly username: string;
  public readonly password: string | null;
  public readonly passwordConfirm: string | null;

  constructor(
    userId: string,
    email: string,
    username: string,
    password: string | null,
    passwordConfirm: string | null
  ) {
    if (!userId || !email || !username) {
      throw new Error("Invalid request body");
    }
    this.userId = userId;
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
  }
};