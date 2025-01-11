import { describe, expect, it } from "vitest";
import { CommentContent } from "../../value_object/commentContent";

describe('CommentContent', () => {
  it('インスタンス生成できること', () => {
    // given
    const content = "これはテストコメントです。";

    // when
    const commentContent = new CommentContent(content);

    // then
    expect(commentContent.value).toBe(content);
  });

  it('コメントが空の場合エラーになること', () => {
    // given
    const content = "";

    // when/then
    expect(() => new CommentContent(content)).toThrowError('コメントを入力してください');
  });

  it('コメントが255文字を超える場合エラーになること', () => {
    // given
    const content = "あ".repeat(256);

    // when/then
    expect(() => new CommentContent(content)).toThrowError('コメントは255文字以内で入力してください');
  });
});
