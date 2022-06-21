import { createContext } from "react";
import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";

type initializeContext = {
  app: FirebaseApp | undefined;
};

type FirebaseAppProps = {
  children: React.ReactNode;
  app: FirebaseApp | undefined;
};

export const createApp = (config: FirebaseOptions) => {
  return initializeApp(config);
};

const appContext = createContext<initializeContext>({
  app: undefined
});

export const FirebaseProvider = ({ children, app }: FirebaseAppProps) => {
  return <appContext.Provider value={{ app }}>{children}</appContext.Provider>;
};

export default appContext;
