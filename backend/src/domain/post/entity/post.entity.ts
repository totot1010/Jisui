import { UserId } from "../../user/value_object";
import { PostId, Price, Title } from "../value_object";
import { Comment } from "./comment.entity";
import { Like } from "./like.entity";

export class Post {
  private readonly postId: PostId;
  private title: Title;
  private price: Price;
  private readonly userId: UserId;
  private createdAt: Date;
  private updatedAt: Date;
  private likes: Like[];
  private comments: Comment[];

  // TODO: 画像の関連付けを実装する
  // private images: PostImage[];

  constructor(
    postId: PostId,
    title: Title,
    price: Price,
    userId: UserId,
    createdAt: Date,
    updatedAt: Date,
    likes: Like[] = [],
    comments: Comment[] = []
  ) {
    this.postId = postId;
    this.title = title;
    this.price = price;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.likes = likes;
    this.comments = comments;
  }

  // 永続化層から取得したデータをエンティティに変換する際に使用
  public static reConstruct(
    postId: string,
    title: string,
    price: number,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
    likes: Like[] = [],
    comments: Comment[] = []
  ): Post {
    return new Post(
      new PostId(postId),
      new Title(title),
      new Price(price),
      new UserId(userId),
      createdAt,
      updatedAt,
      likes,
      comments
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

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getLikes(): Like[] {
    return this.likes;
  }

  public getComments(): Comment[] {
    return this.comments;
  }
}
