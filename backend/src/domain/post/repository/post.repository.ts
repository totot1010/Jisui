import { Post } from "../entity/post.entity";

export interface IPostRepository {
  findAll(): Promise<Post[]>;
}
