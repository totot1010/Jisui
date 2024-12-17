import { Post } from "../../../domain/post/entity/post.entity";
import { IPostRepository } from "../../../domain/post/repository/post.repository";

export class PostQueryService {
  constructor(private readonly postRepository: IPostRepository) { }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll();
  }
}
