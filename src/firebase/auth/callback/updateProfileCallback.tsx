import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";
import returnAuth from "../auth";

type UserInfo = {
  readonly displayName?: string;
  readonly photoURL?: string;
};

type Param = {
  value: UserInfo;
  onCompleted?: () => void;
  onError?: (error: any) => void;
};

const UpdateProfileCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = returnAuth();

  const updateProfileFunc: FunctionParamCallback<Param> = ({
    value,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    updateProfile(auth.currentUser!, value)
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

  return [updateProfileFunc, { loading, error }];
};

export default UpdateProfileCallback;
