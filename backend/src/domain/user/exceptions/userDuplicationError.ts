export class UserDuplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserDuplicationError";
  }
}
