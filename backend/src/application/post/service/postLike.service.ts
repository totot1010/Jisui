import { Like } from "../../../domain/post/entity/like.entity";
import { IPostRepository } from "../../../domain/post/repository/post.repository";
import { PostId } from "../../../domain/post/value_object";
import { UserId } from "../../../domain/user/value_object";
import { LikePostRequestDto } from "../dto/likePost.dto";


export class PostLikeService {
  constructor(private postRepository: IPostRepository) { }

  async toggleLike(likePostRequestDto: LikePostRequestDto): Promise<void> {
    const userId = new UserId(likePostRequestDto.userId);
    const postId = new PostId(likePostRequestDto.postId);
    const like = new Like(userId, postId);
    const existsLike = await this.postRepository.existsLikeByUserAndPost(like);

    if (existsLike) {
      await this.unlike(like);
    } else {
      await this.like(like);
    }
  }

  private async unlike(existingLike: Like): Promise<void> {
    await this.postRepository.deleteLike(existingLike);
  }

  private async like(newLike: Like): Promise<void> {
    await this.postRepository.createLike(newLike);

  }

}
