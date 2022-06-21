import { Auth, signOut } from "firebase/auth";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const signOutAsync = (auth: Auth) =>
  FunctionAsyncReturnError(async () => {
    await signOut(auth);
    return true;
  });

export default signOutAsync;
