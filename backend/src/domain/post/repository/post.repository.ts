import { UserId } from "../../user/value_object";
import { Post } from "../entity/post.entity";
import { PostId } from "../value_object";

export interface IPostRepository {
  create(post: Post): Promise<Post>;
  findAll(): Promise<Post[]>;
  isExistsPostLikeByUserIdAndPostId(userId: UserId, postId: PostId): Promise<boolean>;
  like(userId: UserId, postId: PostId): Promise<void>;
  unlike(userId: UserId, postId: PostId): Promise<void>;
}
