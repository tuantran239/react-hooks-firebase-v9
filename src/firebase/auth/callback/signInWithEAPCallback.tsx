import { useState } from "react";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";
import returnAuth from "../auth";

type Param = {
  value: {
    email: string;
    password: string;
  };
  onCompleted?: (data: User) => void;
  onError?: (error: any) => void;
};

const SignInWithEAPCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<User | null>(null);
  const auth = returnAuth();

  const signIn: FunctionParamCallback<Param> = ({
    value: { email, password },
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        const user = userCredential.user;
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

  return [signIn, { loading, error, data }];
};

export default SignInWithEAPCallback;
