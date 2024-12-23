import { describe, it, expect, vi } from 'vitest';
import { LoginService } from '../../service/login.service';
import { UserFakeRepository } from '../../../../infrastructure/repository/user.fakeRepository';
import { TokenService } from '../../service/token.service';
import { Email } from '../../../../domain/user/value_object';
import { UserNotFoundError } from '../../../../domain/user/exceptions/userNotFoundError';
import { AuthenticationError } from '../../exceptions/authenticationError';

vi.mock('../../../domain/user/value_object', () => ({
  Email: vi.fn(),
  RawPassword: vi.fn(() => ({
    compare: vi.fn().mockResolvedValue(true),
  })),
}));



vi.mock('../../service/token.service', () => ({
  TokenService: vi.fn().mockImplementation(() => ({
    generateTokens: vi.fn().mockResolvedValue({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    }),
    verifyToken: vi.fn().mockResolvedValue('mock-user-id'),
    refreshAccessToken: vi.fn().mockResolvedValue('mock-access-token'),
  })),
}));


describe('LoginService', () => {
  const mockUserRepository = new UserFakeRepository();
  const mockTokenService = new TokenService();
  const loginService = new LoginService(mockUserRepository, mockTokenService);

  it('ログイン成功時にトークンを返すこと', async () => {
    // given
    const user = {
      getUserId: vi.fn(() => ({ value: '1234' })),
      getUsername: vi.fn(() => ({ value: 'testuser' })),
      getHashedPassword: vi.fn(() => ({
        compare: vi.fn().mockResolvedValue(true),
      })),
    };

    mockUserRepository.findByEmail = vi.fn().mockResolvedValue(user);
    mockTokenService.generateTokens = vi.fn().mockResolvedValue({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    const loginRequestDto = { email: 'test@example.com', password: 'password123' };

    // when
    const result = await loginService.login(loginRequestDto);

    // then
    expect(result).toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      userId: '1234',
      username: 'testuser',
    });
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(new Email('test@example.com'));
    expect(mockTokenService.generateTokens).toHaveBeenCalledWith('1234');
  });

  it('存在しないユーザーでエラーをスローすること', async () => {
    // given
    mockUserRepository.findByEmail = vi.fn().mockResolvedValue(null);
    const loginRequestDto = { email: 'unknown@example.com', password: 'password123' };

    // when/then
    await expect(loginService.login(loginRequestDto)).rejects.toThrowError(UserNotFoundError);
  });

  it('パスワード不一致でエラーをスローすること', async () => {
    // given
    const user = {
      getHashedPassword: vi.fn(() => ({
        compare: vi.fn().mockResolvedValue(false),
      })),
    };

    mockUserRepository.findByEmail = vi.fn().mockResolvedValue(user);

    const loginRequestDto = { email: 'test@example.com', password: 'wrongpassword' };

    // when/then
    await expect(loginService.login(loginRequestDto)).rejects.toThrowError(AuthenticationError);
  });

  it('リフレッシュトークンでアクセストークンを返すこと', async () => {
    // given
    const refreshToken = 'valid-refresh-token';

    mockTokenService.refreshAccessToken = vi.fn().mockResolvedValue('new-access-token');

    // when
    const result = await loginService.refresh(refreshToken);

    // then
    expect(result).toBe('new-access-token');
    expect(mockTokenService.refreshAccessToken).toHaveBeenCalledWith(refreshToken);
  });
});
