import {
  Auth,
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
  signOut,
  User,
} from "firebase/auth";
import { ProviderType } from "../../base";
import { providerObject } from "../../provider";

import { FunctionAsyncThrowError } from "../../utils/FunctionAsync";

const onAuthStateChangedPromise = (auth: Auth): Promise<User> => {
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

export const getAuthAsync = (auth: Auth) =>
  FunctionAsyncThrowError<User>(async () => {
    const user = await onAuthStateChangedPromise(auth);
    return user;
  });

export const createUserWithEAPAsync = (
  auth: Auth,
  email: string,
  password: string
) =>
  FunctionAsyncThrowError<User>(async () => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  });

export const sendEmailVerificationAsync = (auth: Auth) =>
  FunctionAsyncThrowError(async () => {
    await sendEmailVerification(auth.currentUser!);
    return true;
  });

export const sendPasswordResetEmailAsync = (auth: Auth, email: string) =>
  FunctionAsyncThrowError(async () => {
    await sendPasswordResetEmail(auth, email);
    return true;
  });

export const signInWithEAPAsync = (
  auth: Auth,
  email: string,
  password: string
) =>
  FunctionAsyncThrowError<User>(async () => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  });

export const signInWithProviderAsync = (
  auth: Auth,
  provider: ProviderType,
  type: "popup" | "redirect"
) => {
  if (type === "redirect") {
    signInWithRedirect(auth, providerObject[provider]);
    return FunctionAsyncThrowError<User>(async () => {
      const userCredential = await getRedirectResult(auth);
      return userCredential!.user;
    });
  } else {
    return FunctionAsyncThrowError<User>(async () => {
      const userCredential = await signInWithPopup(
        auth,
        providerObject[provider]
      );
      return userCredential.user;
    });
  }
};

type UserInfo = {
  displayName?: string;
  photoURL?: string;
};

export const updateProfileAsync = (auth: Auth, userInfo: UserInfo) =>
  FunctionAsyncThrowError(async () => {
    await updateProfile(auth.currentUser!, userInfo);
    return true;
  });

export const signOutAsync = (auth: Auth) =>
  FunctionAsyncThrowError(async () => {
    await signOut(auth);
    return true;
  });
