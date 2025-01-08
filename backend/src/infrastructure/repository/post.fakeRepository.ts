import { Like } from "../../domain/post/entity/like.entity";
import { Post } from "../../domain/post/entity/post.entity";
import { IPostRepository } from "../../domain/post/repository/post.repository";
import { PostId, Price, Title } from "../../domain/post/value_object";
import { UserId } from "../../domain/user/value_object";


export class PostFakeRepository implements IPostRepository {

  async create(post: Post): Promise<Post> {
    const postId = post.getPostId().value;
    const title = post.getTitle().value;
    const price = post.getPrice().value;
    const userId = post.getUserId().value
    const createAt = post.getCreateAt();
    const updatedAt = post.getUpdatedAt();

    return Post.reConstruct(postId, title, price, userId, createAt, updatedAt);
  }

  async findAll(): Promise<Post[]> {
    const posts: Post[] = [
      new Post(
        PostId.generate(),
        new Title('Post 1'),
        new Price(1000),
        UserId.generate(),
        new Date(),
        new Date()
      ),
      new Post(
        PostId.generate(),
        new Title('Post 2'),
        new Price(2000),
        UserId.generate(),
        new Date(),
        new Date()
      ),
    ];
    return posts;
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
