import { UserId } from "../../user/value_object";
import { PostId } from "../value_object";

export class Like {
  private readonly userId: UserId;
  private readonly postId: PostId;

  constructor(
    userId: UserId,
    postId: PostId,
  ) {
    this.userId = userId;
    this.postId = postId;
  }

  // 永続化層から取得したデータをエンティティに変換する際に使用
  public static reConstruct(
    userId: string,
    postId: string,
  ): Like {
    return new Like(
      new UserId(userId),
      new PostId(postId),
    );
  }

  // getter
  public getPostId(): PostId {
    return this.postId;
  }

  public getUserId(): UserId {
    return this.userId;
  }
}
