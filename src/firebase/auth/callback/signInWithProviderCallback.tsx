import { useState } from "react";
import {
  User,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import {
  FunctionCallback,
  FunctionParamCallback,
  Process,
  ProviderType,
} from "../../base";
import returnAuth from "../auth";
import { providerObject } from "../../provider";

type Param = {
  provider: ProviderType;
  type: "popup" | "redirect";
  onCompleted?: (data?: User) => void;
  onError?: (error: any) => void;
};

const SignInWithProviderCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<User | null | undefined>(null);
  const auth = returnAuth();

  const signIn: FunctionParamCallback<Param> = ({
    provider,
    type,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    if (type === "redirect") {
      signInWithRedirect(auth, providerObject[provider]);
      getRedirectResult(auth)
        .then((userCredential) => {
          setLoading(false);
          const user = userCredential?.user;
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
    } else {
      signInWithPopup(auth, providerObject[provider])
        .then((userCredential) => {
          setLoading(false);
          const user = userCredential.user;
          setData(user);
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
    }
  };

  return [signIn, { loading, error, data }];
};

export default SignInWithProviderCallback;
