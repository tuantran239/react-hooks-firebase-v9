import onTransactionCallback from "./onTransactionCallback";
import { useAuth } from "../auth";
import { useFireStore } from "../firestore";
import { useStorage } from "../storge";

export function useTransaction() {
  const {
    auth,
  } = useAuth();
  const { createDocRef, createCollection } = useFireStore();
  const { createStorageRef } = useStorage();

  return {
    auth,
    onTransactionCallback,
    createDocRef,
    createCollection,
    createStorageRef,
  };
}
