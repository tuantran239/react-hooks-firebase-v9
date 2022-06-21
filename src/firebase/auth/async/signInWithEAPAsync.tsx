import { Auth, signInWithEmailAndPassword, User } from "firebase/auth";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const SignInWithEAPAsync = (auth: Auth, email: string, password: string) =>
FunctionAsyncReturnError<User>(async () => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
})

export default SignInWithEAPAsync;
