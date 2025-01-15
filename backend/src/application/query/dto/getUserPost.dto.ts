export class GetUserPostRequestDto {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}


export type PostCommentDto = {
  readonly id: string
  readonly userId: string
  readonly username: string
  readonly content: string
  readonly createdAt: Date
  readonly updatedAt: Date | undefined
}

export class GetUserPostResponseDto {
  public readonly postId: string
  public readonly title: string
  public readonly price: number
  public readonly userId: string
  public readonly username: string
  public readonly createdAt: Date
  public readonly updatedAt: Date
  public readonly likes: string[]
  public readonly comments: PostCommentDto[]

  constructor(
    postId: string,
    title: string,
    price: number,
    userId: string,
    username: string,
    createdAt: Date,
    updatedAt: Date,
    likes: string[],
    comments: PostCommentDto[]
  ) {
    this.postId = postId;
    this.title = title;
    this.price = price;
    this.userId = userId;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.likes = likes;
    this.comments = comments;
  }
};
