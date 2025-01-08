export class LikePostRequestDto {
  userId: string;
  postId: string;

  constructor(postId: string, userId: string) {
    this.userId = userId;
    this.postId = postId;
  }
}
