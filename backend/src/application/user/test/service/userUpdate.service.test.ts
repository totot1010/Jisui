import { describe, it, expect, vi } from 'vitest';
import { CheckUserDuplicationDomainService } from '../../../../domain/user/service/checkUserDuplication.domainService';
import { UserFakeRepository } from '../../../../infrastructure/repository/user.fakeRepository';
import { UserDuplicationError } from '../../../../domain/user/exceptions/userDuplicationError';
import { User } from '../../../../domain/user/entity/user.entity';
import { UserUpdateService } from '../../service/userUpdate.service';
import { UpdateUserRequestDto } from '../../dto/updateUser.dto';


describe('UserUpdateService', () => {
  const userFakeRepository = new UserFakeRepository()
  const checkUserDuplicationDomainService = new CheckUserDuplicationDomainService(userFakeRepository);
  const userUpdateService = new UserUpdateService(userFakeRepository, checkUserDuplicationDomainService);

  it('ユーザーが更新されること', async () => {
    // given
    checkUserDuplicationDomainService.execute = vi.fn().mockResolvedValue(null);
    const userId = 'userId';
    const email = 'test@example.com';
    const username = 'testUser';
    const password = 'password123';
    const confirmPassword = password;
    const updateUserDto = new UpdateUserRequestDto(userId, email, username, password, confirmPassword);

    // when
    const result = await userUpdateService.update(updateUserDto);

    // then
    expect(result).toBeInstanceOf(User);
    expect(result.getUserId().value).toBe(userId);
    expect(result.getEmail().value).toBe(email);
    expect(result.getUsername().value).toBe(username);
  });

  it('既にユーザーが存在する場合はエラーが出ること', async () => {
    // given
    checkUserDuplicationDomainService.execute = vi.fn().mockImplementation(() => {
      throw new UserDuplicationError("ユーザーが既に存在します")
    })

    const userId = 'userId';
    const email = 'test@example.com';
    const username = 'testUser';
    const password = 'password123';
    const confirmPassword = password;
    const updateUserDto = new UpdateUserRequestDto(userId, email, username, password, confirmPassword);

    // when & then
    await expect(userUpdateService.update(updateUserDto)).rejects.toThrowError(
      new UserDuplicationError('ユーザーが既に存在します')
    );
  });

  it('パスワードが一致しない場合はエラーが出ること', async () => {
    // given
    checkUserDuplicationDomainService.execute = vi.fn().mockResolvedValue(null);
    const userId = 'userId';
    const email = 'test@example.com';
    const username = 'testUser';
    const password = 'password123';
    const confirmPassword = 'password456';
    const updateUserDto = new UpdateUserRequestDto(userId, email, username, password, confirmPassword);

    // when & then
    await expect(userUpdateService.update(updateUserDto)).rejects.toThrowError(
      new Error('パスワードが一致しません')
    );
  });

  it('パスワードがない場合も更新が行えること', async () => {
    // given
    checkUserDuplicationDomainService.execute = vi.fn().mockResolvedValue(null);
    const userId = 'userId';
    const email = 'test@example.com';
    const username = 'testUser';
    const password = '';
    const confirmPassword = '';

    const updateUserDto = new UpdateUserRequestDto(userId, email, username, password, confirmPassword);

    // when
    const result = await userUpdateService.update(updateUserDto);

    // then
    expect(result).toBeInstanceOf(User);
    expect(result.getUserId().value).toBe(userId);
    expect(result.getEmail().value).toBe(email);
    expect(result.getUsername().value).toBe(username);
  });
});
