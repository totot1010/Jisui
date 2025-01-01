import { AsyncLocalStorage } from 'node:async_hooks';
import { Prisma } from '@prisma/client';

// AsyncLocalStorageを利用してコンテキストを保持
export const transactionContext = new AsyncLocalStorage<Prisma.TransactionClient>();
