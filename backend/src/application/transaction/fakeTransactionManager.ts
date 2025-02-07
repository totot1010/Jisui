import { ITransactionManager } from "./transactionManager";

class FakeTransactionManager implements ITransactionManager {
  async run<T>(callback: () => Promise<T>): Promise<T> {
    return callback();
  }
}

export const fakeTransactionManager = new FakeTransactionManager();
