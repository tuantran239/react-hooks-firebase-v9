import { Auth, sendPasswordResetEmail } from "firebase/auth";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";


const SendPasswordResetEmailAsync = (auth: Auth, email: string) =>
FunctionAsyncReturnError(async () => {
  await sendPasswordResetEmail(
    auth,
    email,
  );
  return true;
})

export default SendPasswordResetEmailAsync;
