import { describe, expect, it, vi } from "vitest";
import { PostId } from "../../value_object";

describe('PostId', () => {
  it('インスタンス生成できること', () => {
    // given
    const value = '1234-5678-9012';

    // when
    const postId = new PostId(value);

    // then
    expect(postId.value).toBe(value);
  });

  it('generateメソッドでUUIDが生成されること', () => {
    // given
    vi.mock('uuid', () => {
      return {
        v4: vi.fn().mockReturnValue('e3162725-4b5b-4779-bf13-14d55d63a585'),
      };
    });
    // when
    const postId = PostId.generate();

    // then
    expect(postId.value).toBe('e3162725-4b5b-4779-bf13-14d55d63a585');
  });

});
