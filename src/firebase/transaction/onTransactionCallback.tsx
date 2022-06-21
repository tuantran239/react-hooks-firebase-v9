import { useState } from "react";
import Transaction from "./Transaction";

export interface FunctionParam {
  onRun: (transaction: Transaction) => void;
  onError?: (error: any) => void;
}

const OnTransactionCallback = (): [
  onTransaction: (input: FunctionParam) => void,
  process: { loading?: boolean; error?: any }
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const onTransaction = async ({ onRun, onError }: FunctionParam) => {
    setLoading(true);
    try {
      await onRun(new Transaction());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      if (onError) {
        onError(error);
      }
    }
  };
  return [onTransaction, { loading, error }];
};

export default OnTransactionCallback;
