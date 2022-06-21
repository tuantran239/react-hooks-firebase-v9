import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";
import returnAuth from "../auth";

type Param = {
  onCompleted?: () => void;
  onError?: (error: any) => void;
};

const SendEmailVerificationCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = returnAuth();

  const sendEmailFunc: FunctionParamCallback<Param> = ({
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    sendEmailVerification(auth.currentUser!)
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

  return [sendEmailFunc, { loading, error }];
};

export default SendEmailVerificationCallback;
