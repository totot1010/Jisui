export class LoginRequestDto {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  userId: string;
  username: string;

  constructor(accessToken: string, refreshToken: string, userId: string, username: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = userId;
    this.username = username;
  }
}