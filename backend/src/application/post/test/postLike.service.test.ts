import { describe, it, vi } from "vitest";
import { PostLikeService } from "../service/postLike.service";
import { PostFakeRepository } from '../../../infrastructure/repository/post.fakeRepository';
import { LikePostRequestDto } from "../dto/likePost.dto";
import { PostId } from "../../../domain/post/value_object";
import { UserId } from "../../../domain/user/value_object";


describe('PostLikeService', () => {
  const postFakeRepository = new PostFakeRepository()
  const postLikeService = new PostLikeService(postFakeRepository);


  it('投稿にいいねすることができること', async () => {
    // given
    postFakeRepository.isExistsPostLikeByUserIdAndPostId = vi.fn().mockResolvedValue(false);
    const likePostRequestDto = new LikePostRequestDto(PostId.generate().value, UserId.generate().value);
    // when & then
    await postLikeService.likePost(likePostRequestDto);
  });

  it('投稿のいいねを外すことができること', async () => {
    // given
    postFakeRepository.isExistsPostLikeByUserIdAndPostId = vi.fn().mockResolvedValue(true);
    const likePostRequestDto = new LikePostRequestDto(PostId.generate().value, UserId.generate().value);
    // when & then
    await postLikeService.likePost(likePostRequestDto);
  });
});
