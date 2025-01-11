import { UserId } from "../../user/value_object";
import { CommentContent, CommentId, PostId } from "../value_object";


export class Comment {
  private readonly id: CommentId;
  private readonly postId: PostId;
  private readonly userId: UserId;
  private readonly content: CommentContent;

  constructor(id: CommentId, postId: PostId, userId: UserId, content: CommentContent) {
    this.id = id;
    this.postId = postId;
    this.userId = userId;
    this.content = content;
  }

  public getCommentId(): CommentId {
    return this.id;
  }

  public getPostId(): PostId {
    return this.postId;
  }

  public getUserId(): UserId {
    return this.userId;
  }

  public getContent(): CommentContent {
    return this.content;
  }

  public static reConstruct(id: string, postId: string, userId: string, content: string): Comment {
    return new Comment(
      new CommentId(id),
      new PostId(postId),
      new UserId(userId),
      new CommentContent(content),
    );
  }
}
