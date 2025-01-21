import { Post } from "../../../domain/post/entity/post.entity";
import { IPostRepository } from "../../../domain/post/repository/post.repository";
import { PostCountType } from "../../../domain/post/types/postCountType";
import { UserId } from "../../../domain/user/value_object";

export class PostQueryService {
  constructor(private readonly postRepository: IPostRepository) { }

  async findAll(userId: string | undefined): Promise<Post[]> {
    return await this.postRepository.findAll(userId);
  }

  async countByUserIdAndType(userId: string, type: PostCountType): Promise<number> {
    return await this.postRepository.countByUserIdAndType(new UserId(userId), type);
  }
}
