import { Like } from "../../domain/post/entity/like.entity";
import { Post } from "../../domain/post/entity/post.entity";
import { IPostRepository } from "../../domain/post/repository/post.repository";


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


  async existsLikeByUserAndPost(like: Like): Promise<boolean> {
    return true
  }

  async createLike(newLike: Like): Promise<void> {
    return
  }

  async deleteLike(existingLike: Like): Promise<void> {
    return
  }
}
