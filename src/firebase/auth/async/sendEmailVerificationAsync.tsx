import { Auth, sendEmailVerification } from "firebase/auth";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const SendEmailVerificationAsync = (auth: Auth) =>
  FunctionAsyncReturnError(async () => {
    await sendEmailVerification(auth.currentUser!);
    return true;
  });

export default SendEmailVerificationAsync;
