import { UserId } from "../../user/value_object";
import { Comment } from "../entity/comment.entity";
import { Like } from "../entity/like.entity";
import { Post } from "../entity/post.entity";
import { PostCountType } from "../types/postCountType";

export interface IPostRepository {
  create(post: Post): Promise<Post>;
  findAll(userId: string | undefined): Promise<Post[]>;
  countByUserIdAndType(userId: UserId, type: PostCountType): Promise<number>;
  existsLikeByUserAndPost(like: Like): Promise<boolean>;
  createLike(existingLike: Like): Promise<void>;
  deleteLike(newLike: Like): Promise<void>;
  createComment(comment: Comment): Promise<void>;
}
