import { describe, it, expect, vi } from 'vitest';
import { UserId } from '../../value_object';

describe('UserId', () => {
  it('インスタンス生成できること', () => {
    // given
    const value = '1234-5678-9012';

    // when
    const userId = new UserId(value);

    // then
    expect(userId.value).toBe(value);
  });

  it('generateメソッドでUUIDが生成されること', () => {
    // given
    vi.mock('uuid', () => {
      return {
        v4: vi.fn().mockReturnValue('e3162725-4b5b-4779-bf13-14d55d63a584'),
      };
    });
    // when
    const userId = UserId.generate();

    // then
    expect(userId.value).toBe('e3162725-4b5b-4779-bf13-14d55d63a584');
  });
});
