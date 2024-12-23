import { describe, it, expect } from 'vitest';
import { Email } from '../../value_object';

describe('Email', () => {
  it('正常にインスタンスが生成されること', () => {
    // given
    const email = 'test@example.com';

    // when
    const emailInstance = new Email(email);

    // then
    expect(emailInstance.value).toBe(email);
  });

  it('3文字未満の場合はエラーが発生すること', () => {
    // given
    const email = 'a@';

    // when/then
    expect(() => new Email(email)).toThrowError('メールアドレスは3文字以上にしてください');
  });

  it('メールアドレスの形式が正しくない場合はエラーが発生すること', () => {
    // Given
    const invalidEmails = ['invalidemail', 'invalid@', 'invalid@domain', 'invalid@domain.', 'invalid@domain,com'];

    // when/then
    invalidEmails.forEach((email) => {
      expect(() => new Email(email)).toThrowError('メールアドレスの形式が正しくありません');
    });
  });
});
