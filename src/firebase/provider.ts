import { ProviderObject } from "./base";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";

export const providerObject: ProviderObject = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
  facebook: new FacebookAuthProvider(),
  twitter: new TwitterAuthProvider(),
  apple: new OAuthProvider('apple.com'),
  microsoft: new OAuthProvider('microsoft.com')
};
