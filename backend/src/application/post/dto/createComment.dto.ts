export class CreateCommentRequestDto {
  userId: string;
  postId: string;
  content: string;

  constructor(postId: string, userId: string, content: string) {
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }
}
