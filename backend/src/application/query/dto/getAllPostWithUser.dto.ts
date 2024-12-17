export class getAllPostWithUserDto {
  public readonly postId: string
  public readonly title: string
  public readonly price: number
  public readonly userId: string
  public readonly username: string
  public readonly createAt: Date
  public readonly updatedAt: Date

  constructor(
    postId: string,
    title: string,
    price: number,
    userId: string,
    username: string,
    createAt: Date,
    updatedAt: Date
  ) {
    this.postId = postId;
    this.title = title;
    this.price = price;
    this.userId = userId;
    this.username = username;
    this.createAt = createAt;
    this.updatedAt = updatedAt;
  }
};