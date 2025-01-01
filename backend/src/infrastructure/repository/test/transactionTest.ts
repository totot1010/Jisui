import { withTransaction } from '../../prisma/withTransaction';

export const transactionTest = (callback: () => Promise<void>) => async () => {
  await withTransaction(async () => {
    await callback();

    // ロールバックさせる
    throw new Error('rollback');
  }).catch((e) => {
    if (e instanceof Error && e.message === 'rollback') {
      // rollbackエラーは想定内なので無視
      return;
    }
    // 他のエラーはそのままスロー
    throw e;
  });
};
