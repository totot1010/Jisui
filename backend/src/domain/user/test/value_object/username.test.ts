import { describe, expect, it } from "vitest";
import { Username } from "../../value_object";

describe('Username', () => {
  it('インスタンス生成できること', () => {
    // given
    const value = 'validUsername';

    // when
    const username = new Username(value);

    // then
    expect(username.value).toBe(value);
  });

  it('3文字未満の場合はエラーが発生すること', () => {
    // given
    const value = 'ab';

    // When/Then
    expect(() => new Username(value)).toThrowError('ユーザー名は3文字以上にしてください');
  });

  it('50文字を超える場合はエラーが発生すること', () => {
    // given
    const value = 'a'.repeat(51);

    // when/then
    expect(() => new Username(value)).toThrowError('ユーザー名は50文字以下にしてください');
  });
});