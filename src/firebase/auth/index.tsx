import createUserWithEAPCallback from "./callback/createUserWithEAPCallback";
import signInWithEAPCallback from "./callback/signInWithEAPCallback";
import SignInWithProviderCallback from "./callback/signInWithProviderCallback";
import sendPasswordResetEmailCallback from "./callback/sendPasswordResetEmailCallback";
import updateProfileCallback from "./callback/updateProfileCallback";
import getAuthCallback from "./callback/getAuthCallBack";
import signOutCallback from "./callback/signOutCallback";
import sendEmailVerificationCallback from "./callback/sendEmailVerificationCallback";

import getAuthAsync from "./async/getAuthAsync";
import updateProfileAsync from "./async/updateProfileAsync";
import createUserWithEAPAsync from "./async/createUserWithEAPAsync";
import signInWithEAPAsync from "./async/signInWithEAPAsync";
import signInWithProviderAsync from "./async/signInWithProviderAsync";
import signOutAsync from "./async/signOutAsync";
import sendPasswordResetEmailAsync from "./async/sendPasswordResetEmailAsync";
import sendEmailVerificationAsync from "./async/sendEmailVerificationAsync";
import returnAuth from "./auth";


export const useAuth = () => {
  const auth = returnAuth();

  return {
    auth,
    createUserWithEAPCallback,
    signInWithEAPCallback,
    SignInWithProviderCallback,
    sendPasswordResetEmailCallback,
    updateProfileCallback,
    sendEmailVerificationCallback,
    getAuthCallback,
    signOutCallback,
    getAuthAsync,
    updateProfileAsync,
    createUserWithEAPAsync,
    signInWithEAPAsync,
    signInWithProviderAsync,
    signOutAsync,
    sendPasswordResetEmailAsync,
    sendEmailVerificationAsync,
  };
};
