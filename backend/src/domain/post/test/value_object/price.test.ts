import { describe, expect, it } from "vitest";
import { Price } from "../../value_object";

describe('Price', () => {
  it('インスタンス生成できること', () => {
    // given
    const value = 1000;

    // when
    const price = new Price(value);

    // then
    expect(price.value).toBe(value);
  });

  it('価格が0円以下の場合エラーになること', () => {
    // given
    const value = -1;

    // when/then
    expect(() => new Price(value)).toThrowError('価格は0円以上にしてください');
  });

  it('価格が1000000円以上の場合エラーになること', () => {
    // given
    const value = 1000000;

    // when/then
    expect(() => new Price(value)).toThrowError('価格は1000000円未満にしてください');
  });
});
