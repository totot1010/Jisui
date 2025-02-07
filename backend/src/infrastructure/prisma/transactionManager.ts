import { ITransactionManager } from "../../application/transaction/transactionManager";
import { withTransaction } from "./withTransaction";

class TransactionManager implements ITransactionManager {
  async run<T>(callback: () => Promise<T>): Promise<T> {
    return withTransaction(callback);
  }
}

export const transactionManager = new TransactionManager();