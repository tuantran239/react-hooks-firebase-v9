import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  User,
  Auth,
} from "firebase/auth";
import { ProviderType } from "../../base";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";
import { providerObject } from "../../provider";

const SignInWithProviderAsync = (
  auth: Auth,
  provider: ProviderType,
  type: "popup" | "redirect"
) => {
  if (type === "redirect") {
    signInWithRedirect(auth, providerObject[provider]);
    return FunctionAsyncReturnError<User>(async () => {
      const userCredential = await getRedirectResult(auth);
      return userCredential!.user;
    });
  } else {
    return FunctionAsyncReturnError<User>(async () => {
      const userCredential = await signInWithPopup(
        auth,
        providerObject[provider]
      );
      return userCredential.user;
    });
  }
};

export default SignInWithProviderAsync;
