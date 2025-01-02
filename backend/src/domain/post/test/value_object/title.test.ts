import { describe, expect, it } from "vitest";
import { Title } from "../../value_object";

describe('Title', () => {
  it('インスタンス生成できること', () => {
    // given
    const value = 'title';

    // when
    const title = new Title(value);

    // then
    expect(title.value).toBe(value);
  });

  it('1文字未満の場合はエラーが発生すること', () => {
    // given
    const value = '';

    // When/Then
    expect(() => new Title(value)).toThrowError('タイトルは1文字以上にしてください');
  });

  it('50文字を超える場合はエラーが発生すること', () => {
    // given
    const value = 'a'.repeat(51);

    // when/then
    expect(() => new Title(value)).toThrowError('タイトルは50文字以下にしてください');
  });
});
