class GetUserRequestDto {
  public readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}

class GetUserResponseDto {
  public readonly userId: string;
  public readonly email: string;
  public readonly username: string;

  constructor(
    userId: string,
    email: string,
    username: string
  ) {
    this.userId = userId;
    this.email = email;
    this.username = username;
  }

}

export { GetUserRequestDto, GetUserResponseDto };