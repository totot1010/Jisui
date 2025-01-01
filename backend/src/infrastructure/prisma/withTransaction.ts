import { prisma } from "./prisma";
import { transactionContext } from "./transactionContext";

export async function withTransaction<T = void>(callback: () => Promise<T>): Promise<T> {
  return prisma.$transaction(async (tx) => {
    // トランザクションクライアントをコンテキストに保存
    return transactionContext.run(tx, callback);
  });
}
