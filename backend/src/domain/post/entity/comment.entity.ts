import { UserId } from "../../user/value_object";
import { CommentContent, CommentId, PostId } from "../value_object";


export class Comment {
  private readonly id: CommentId;
  private readonly postId: PostId;
  private readonly userId: UserId;
  private readonly content: CommentContent;
  private readonly createdAt: Date;
  private readonly updatedAt?: Date;

  constructor(id: CommentId, postId: PostId, userId: UserId, content: CommentContent, createdAt: Date, updatedAt?: Date) {
    this.id = id;
    this.postId = postId;
    this.userId = userId;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  public static reConstruct(id: string, postId: string, userId: string, content: string, createdAt: Date, updatedAt?: Date): Comment {
    return new Comment(
      new CommentId(id),
      new PostId(postId),
      new UserId(userId),
      new CommentContent(content),
      createdAt,
      updatedAt,
    );
  }
}
