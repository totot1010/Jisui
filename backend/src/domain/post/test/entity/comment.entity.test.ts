import { describe, expect, it } from "vitest";
import { CommentId, CommentContent, PostId } from "../../value_object";
import { Comment } from "../../entity/comment.entity";
import { UserId } from "../../../user/value_object";
describe('CommentEntity', () => {
  it('インスタンス生成できること', () => {
    // given
    const commentId = CommentId.generate();
    const postId = PostId.generate();
    const userId = UserId.generate();
    const content = new CommentContent('これはテストコメントです。');

    // when
    const comment = new Comment(commentId, postId, userId, content);

    // then
    expect(comment.getCommentId().value).toBe(commentId.value);
    expect(comment.getPostId().value).toBe(postId.value);
    expect(comment.getUserId().value).toBe(userId.value);
    expect(comment.getContent().value).toBe(content.value);
  });

  it('永続化層から取得したデータをエンティティに変換できること', () => {
    // given
    const commentIdValue = CommentId.generate().value;
    const postIdValue = PostId.generate().value;
    const userIdValue = UserId.generate().value;
    const contentValue = 'これはテストコメントです。';

    // when
    const comment = Comment.reConstruct(commentIdValue, postIdValue, userIdValue, contentValue);

    // then
    expect(comment.getCommentId().value).toBe(commentIdValue);
    expect(comment.getPostId().value).toBe(postIdValue);
    expect(comment.getUserId().value).toBe(userIdValue);
    expect(comment.getContent().value).toBe(contentValue);
  });
});