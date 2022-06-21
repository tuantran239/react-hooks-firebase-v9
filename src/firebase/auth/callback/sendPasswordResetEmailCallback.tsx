import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";
import returnAuth from "../auth";

type Param = {
  email: string;
  onCompleted?: () => void;
  onError?: (error: any) => void;
};

const SendPasswordResetEmailCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = returnAuth();

  const resetPasswordFunc: FunctionParamCallback<Param> = ({
    email,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        if (onCompleted) {
          onCompleted();
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        if (onError) {
          onError(err);
        }
      });
  };

  return [resetPasswordFunc, { loading, error }];
};

export default SendPasswordResetEmailCallback;
