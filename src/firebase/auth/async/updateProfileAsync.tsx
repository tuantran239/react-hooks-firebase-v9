import { Auth, updateProfile } from "firebase/auth";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

type UserInfo = {
  displayName?: string;
  photoURL?: string;
};

const UpdateProfileAsync = (auth: Auth, userInfo: UserInfo) =>
  FunctionAsyncReturnError(async () => {
    await updateProfile(auth.currentUser!, userInfo);
    return true;
  });

export default UpdateProfileAsync;
