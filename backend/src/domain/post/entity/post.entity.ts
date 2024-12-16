import { UserId } from "../../user/value_object";
import { PostId, Price, Title } from "../value_object";

export class Post {
  private readonly postId: PostId;
  private title: Title;
  private price: Price;
  private readonly userId: UserId;
  private createAt: Date;
  private updatedAt: Date;

  // TODO: いいね、コメント、画像の関連付けを実装する
  // private likes: PostLike[];
  // private comments: PostComment[];
  // private images: PostImage[];

  constructor(
    postId: PostId,
    title: Title,
    price: Price,
    userId: UserId,
    createAt: Date,
    updatedAt: Date
  ) {
    this.postId = postId;
    this.title = title;
    this.price = price;
    this.userId = userId;
    this.createAt = createAt;
    this.updatedAt = updatedAt;
  }

  // 永続化層から取得したデータをエンティティに変換する際に使用
  public static reConstruct(
    postId: string,
    title: string,
    price: number,
    userId: string,
    createAt: Date,
    updatedAt: Date
  ): Post {
    return new Post(
      new PostId(postId),
      new Title(title),
      new Price(price),
      new UserId(userId),
      createAt,
      updatedAt
    );
  }

  // getter
  public getPostId(): PostId {
    return this.postId;
  }

  public getTitle(): Title {
    return this.title;
  }

  public getPrice(): Price {
    return this.price;
  }

  public getUserId(): UserId {
    return this.userId;
  }

  public getCreateAt(): Date {
    return this.createAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}