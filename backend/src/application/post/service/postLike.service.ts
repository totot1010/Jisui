import { PostId } from "../../../domain/post/value_object";
import { UserId } from "../../../domain/user/value_object";
import { PostRepository } from "../../../infrastructure/repository/post.repository";
import { LikePostRequestDto } from "../dto/likePost.dto";


export class PostLikeService {
  constructor(private postRepository: PostRepository) { }

  async likePost(likePostRequestDto: LikePostRequestDto): Promise<void> {
    const userId = new UserId(likePostRequestDto.userId);
    const postId = new PostId(likePostRequestDto.postId);
    const isExistsPostLike = await this.postRepository.isExistsPostLikeByUserIdAndPostId(userId, postId);

    if (isExistsPostLike) {
      await this.postRepository.unLike(userId, postId);
    } else {
      await this.postRepository.like(userId, postId);
    }
  }
}
