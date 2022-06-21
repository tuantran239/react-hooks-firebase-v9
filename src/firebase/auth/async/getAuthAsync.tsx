import { onAuthStateChanged, Auth, User } from "firebase/auth";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

export const onAuthStateChangedPromise = (auth: Auth): Promise<User> => {
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

const GetAuthAsync = (auth: Auth) =>
  FunctionAsyncReturnError<User>(async () => {
    const user = await onAuthStateChangedPromise(auth);
    return user;
  });

export default GetAuthAsync;
