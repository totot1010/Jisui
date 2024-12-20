import { describe, it, expect, vi } from 'vitest';
import { UserCreateService } from '../../service/userCreate.service';
import { CheckUserDuplicationDomainService } from '../../../../domain/user/service/checkUserDuplication.domainService';
import { CreateUserRequestDto } from '../../dto/createUser.dto';
import { UserFakeRepository } from '../../../../infrastructure/repository/user.fakeRepository';
import { UserDuplicationError } from '../../../../domain/user/exceptions/userDuplicationError';


describe('UserCreateService', () => {
  const userFakeRepository = new UserFakeRepository()
  const checkUserDuplicationDomainService = new CheckUserDuplicationDomainService(userFakeRepository);
  const userCreateService = new UserCreateService(userFakeRepository, checkUserDuplicationDomainService);

  it('ユーザーが作成されること', async () => {
    // given
    checkUserDuplicationDomainService.execute = vi.fn().mockResolvedValue(null);

    const email = 'test@example.com';
    const username = 'testUser';
    const password = 'password123';
    const createUserDto = new CreateUserRequestDto(email, username, password);

    // when
    const result = await userCreateService.create(createUserDto);

    // then
    expect(result).toBeTruthy();
  });

  it('既にユーザーが存在する場合はエラーが出ること', async () => {
    // given
    checkUserDuplicationDomainService.execute = vi.fn().mockImplementation(() => {
      throw new UserDuplicationError("ユーザーが既に存在します")
    })

    const email = 'user@example.com';
    const username = 'user';
    const password = 'password123';
    const createUserDto = new CreateUserRequestDto(email, username, password);

    // when
    let error
    try {
      await userCreateService.create(createUserDto)
    } catch (e: any) {
      error = e;
    }

    // then
    expect(error).toBeInstanceOf(UserDuplicationError);
    expect(error.message).toBe('ユーザーが既に存在します');
  });
});
