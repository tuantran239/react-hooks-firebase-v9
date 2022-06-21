import { createUserWithEmailAndPassword, User, Auth } from "firebase/auth";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const CreateUserWithEAPAsync = (auth: Auth, email: string, password: string) =>
  FunctionAsyncReturnError<User>(async () => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  });

export default CreateUserWithEAPAsync;
