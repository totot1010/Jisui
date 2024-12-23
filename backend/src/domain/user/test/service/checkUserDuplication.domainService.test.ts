import { describe, it, expect, vi } from 'vitest';
import { CheckUserDuplicationDomainService } from '../../../../domain/user/service/checkUserDuplication.domainService';
import { UserFakeRepository } from '../../../../infrastructure/repository/user.fakeRepository';
import { UserDuplicationError } from '../../../../domain/user/exceptions/userDuplicationError';
import { Email } from '../../value_object';


describe('checkUserDuplicationDomainService', () => {
  const userFakeRepository = new UserFakeRepository()
  const checkUserDuplicationDomainService = new CheckUserDuplicationDomainService(userFakeRepository);

  it('ユーザーが登録されていない場合はエラーにならないこと', async () => {
    // given
    const email = new Email('newuser@example.com');
    userFakeRepository.findByEmail = vi.fn().mockResolvedValue(null);

    // when
    const result =  await checkUserDuplicationDomainService.execute(email);

    // then
    expect(result).toBeUndefined();
  });

  it('既にユーザーが登録されているとエラーになること', async () => {
    // given
    const email = new Email('test@example.com');
    userFakeRepository.findByEmail = vi.fn().mockResolvedValue(true);

    // when & then
      await expect(checkUserDuplicationDomainService.execute(email)).rejects.toThrowError(
        new UserDuplicationError('ユーザーが既に存在します')
      );
  });
});
