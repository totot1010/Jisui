import { describe, expect, it, vi } from "vitest";
import { CreateCommentService } from "../service/createComment.service";
import { PostFakeRepository } from '../../../infrastructure/repository/post.fakeRepository';
import { CreateCommentRequestDto } from "../dto/createComment.dto";
import { PostId } from "../../../domain/post/value_object";
import { UserId } from "../../../domain/user/value_object";
import { CommentContent } from "../../../domain/post/value_object/commentContent";

describe('CreateCommentService', () => {
  const postFakeRepository = new PostFakeRepository();
  const createCommentService = new CreateCommentService(postFakeRepository);

  it('投稿にコメントを作成できること', async () => {
    // given
    const createCommentSpy = vi.spyOn(postFakeRepository, 'createComment');
    const postId = PostId.generate().value;
    const userId = UserId.generate().value;
    const content = new CommentContent('これはテストコメントです。');
    const createCommentRequestDto = new CreateCommentRequestDto(postId, userId, content.value);

    // when
    await createCommentService.execute(createCommentRequestDto);

    // then
    expect(createCommentSpy).toHaveBeenCalled();
  });
});