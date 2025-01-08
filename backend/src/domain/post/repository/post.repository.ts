import { UserId } from "../../user/value_object";
import { Like } from "../entity/like.entity";
import { Post } from "../entity/post.entity";
import { PostId } from "../value_object";

export interface IPostRepository {
  create(post: Post): Promise<Post>;
  findAll(): Promise<Post[]>;
  existsLikeByUserAndPost(like: Like): Promise<boolean>;
  createLike(existingLike: Like): Promise<void>;
  deleteLike(newLike: Like): Promise<void>;
}
