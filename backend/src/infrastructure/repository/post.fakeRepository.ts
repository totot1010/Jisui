
import { Post } from "../../domain/post/entity/post.entity";
import { IPostRepository } from "../../domain/post/repository/post.repository";
import { PostId, Price, Title } from "../../domain/post/value_object";
import { UserId } from "../../domain/user/value_object";


export class PostFakeRepository implements IPostRepository {

  async create(post: Post): Promise<Post> {
    const id = 'id';
    const title = 'title';
    const price = 100;
    const userId = 'userId';
    const createAt = new Date();
    const updatedAt = new Date();

    return Post.reConstruct(id, title, price, userId, createAt, updatedAt);
  }

  async findAll(): Promise<Post[]> {
    const post1 = Post.reConstruct('id1', 'title1', 100, 'userId1', new Date(), new Date());
    const post2 = Post.reConstruct('id2', 'title2', 200, 'userId2', new Date(), new Date());
    return [post1, post2];
  }


  async isExistsPostLikeByUserIdAndPostId(userId: UserId, postId: PostId): Promise<boolean> {
    return true
  }

  async like(userId: UserId, postId: PostId): Promise<void> {
    return
  }

  async unlike(userId: UserId, postId: PostId): Promise<void> {
    return
  }
}
