import { describe, it, expect, vi } from 'vitest';
import { RawPassword } from '../../value_object';

describe('RawPassword', () => {
  it('インスタンス生成できること', () => {
    // Given
    const value = 'validPassword';

    // When
    const password = new RawPassword(value);

    // Then
    expect(password.value).toBe(value);
  });

  it('7文字以下の場合はエラーが発生すること', () => {
    // Given
    const value = 'short';

    // When/Then
    expect(() => new RawPassword(value)).toThrowError('パスワードは8文字以上にしてください');
  });
});
