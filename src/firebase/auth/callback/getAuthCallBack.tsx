import { useState } from "react";
import { onAuthStateChanged, Auth, User } from "firebase/auth";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";
import returnAuth from "../auth";

type Param = {
  checkEmailVerified?: boolean;
  onCompleted?: (data: User | null) => void;
  onError?: (error: any) => void;
};

const onAuthStateChangedPromise = (auth: Auth): Promise<User> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return resolve(user);
      } else {
        return reject(new Error("Error auth"));
      }
    });
  });
};

const GetAuthCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<User | null>(null);
  const auth = returnAuth();
  
  const getAuthFunc: FunctionParamCallback<Param> = ({
    checkEmailVerified,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    onAuthStateChangedPromise(auth)
      .then((user) => {
        if (checkEmailVerified && !user.emailVerified) {
          throw new Error("Email not verified");
        }
        setLoading(false);
        setData(user);
        if (onCompleted) {
          onCompleted(user);
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

  return [getAuthFunc, { loading, error, data }];
};

export default GetAuthCallback;
