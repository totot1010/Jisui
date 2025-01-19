import { Comment } from "../../domain/post/entity/comment.entity";
import { Like } from "../../domain/post/entity/like.entity";
import { Post } from "../../domain/post/entity/post.entity";
import { IPostRepository } from "../../domain/post/repository/post.repository";
import { PostCountType } from "../../domain/post/types/postCountType";
import { UserId } from "../../domain/user/value_object";


export class PostFakeRepository implements IPostRepository {

  async create(post: Post): Promise<Post> {
    return Post.reConstruct(
      post.getPostId().value,
      post.getTitle().value,
      post.getPrice().value,
      post.getUserId().value,
      post.getCreatedAt(),
      post.getUpdatedAt(),
      []
    );
  }

  async findAll(): Promise<Post[]> {
    const post1 = Post.reConstruct('id1', 'title1', 100, 'userId1', new Date(), new Date(), []);
    const post2 = Post.reConstruct('id2', 'title2', 200, 'userId2', new Date(), new Date(), []);
    return [post1, post2];
  }

  async countByUserIdAndType(userId: UserId, type: PostCountType): Promise<number> {
    return 10;
  }

  async existsLikeByUserAndPost(like: Like): Promise<boolean> {
    return true
  }

  async createLike(newLike: Like): Promise<void> {
    return
  }

  async createComment(comment: Comment): Promise<void> {
    return
  }

  async deleteLike(existingLike: Like): Promise<void> {
    return
  }
}
