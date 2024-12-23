import { describe, it, expect, vi } from 'vitest';
import bcrypt from 'bcrypt';
import { HashedPassword, RawPassword } from '../../value_object';

vi.mock('bcrypt');

const getSaltSpy = vi.mocked(bcrypt.genSalt);
const hashSpy = vi.mocked(bcrypt.hash);
const compareSpy = vi.mocked(bcrypt.compare);

describe('HashedPassword', () => {
  it('正常にインスタンス生成できること', () => {
    // given
    const hashedValue = 'hashed-value';

    // when
    const hashedPassword = new HashedPassword(hashedValue);

    // then
    expect(hashedPassword.value).toBe(hashedValue);
  });

  it('正常にハッシュ化できること', async () => {
    // given
    getSaltSpy.mockImplementation(() => 'mocked-salt');
    hashSpy.mockImplementation(() => 'mocked-hashed-password');
    const rawPassword = new RawPassword('validpassword');

    // when
    const hashedPassword = await HashedPassword.hash(rawPassword);

    // then
    expect(getSaltSpy).toHaveBeenCalledOnce();
    expect(hashSpy).toHaveBeenCalledWith(rawPassword.value, 'mocked-salt');
    expect(hashedPassword).toBeInstanceOf(HashedPassword);
    expect(hashedPassword.value).toBe('mocked-hashed-password');
  });

  it('正常に比較できること', async () => {
    // given
    compareSpy.mockImplementation(() => true);
    const rawPassword = new RawPassword('validpassword');
    const hashedPassword = new HashedPassword('mocked-hashed-password');

    // when
    const isMatch = await hashedPassword.compare(rawPassword);

    // then
    expect(compareSpy).toHaveBeenCalledWith(rawPassword.value, hashedPassword.value);
    expect(isMatch).toBe(true);
  });
});
