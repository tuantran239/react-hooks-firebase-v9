import { getAuth } from "firebase/auth";
import { useContext } from "react";
import appContext from "..";

function Auth() {
  const { app } = useContext(appContext);
  return getAuth(app);
}

export default Auth;
