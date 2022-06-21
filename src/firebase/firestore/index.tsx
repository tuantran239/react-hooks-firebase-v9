import { useContext } from "react";
import appContext from "..";
import addDocCallback from "./callback/addDocCallback";
import setDocCallback from "./callback/setDocCallback";
import updateDocCallback from "./callback/updateDocCallback";
import deleteDocCallback from "./callback/deleteDocCallback";
import getDocCallback from "./callback/getDocCallback";
import queryDocCallback from "./callback/queryDocCallback";
import queryPaginationCallback from "./callback/queryPaginationCallback";
import onTransactionCallback from "../transaction/onTransactionCallback";
import addDocAsync from "./async/addDocAsync";
import setDocAsync from "./async/setDocAsync";
import updateDocAsync from "./async/updateDocAsync";
import deleteDocAsync from "./async/deleteDocAsync";
import getDocAsync from "./async/getDocAsync";
import queryDocAsync from "./async/queryDocAsync";
import queryPaginationAsync from "./async/queryPaginationAsync";

import { mapToDocumentData, convertToDocumentData } from '../utils/map';

import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getFirestore,
} from "firebase/firestore";

export const useFireStore = () => {
  const { app } = useContext(appContext);
  const db = getFirestore(app);

  function createDocRef(
    path: string,
    ...pathSegments: string[]
  ): DocumentReference {
    return doc(db, path, ...pathSegments);
  }

  function createCollection(
    path: string,
    ...pathSegments: string[]
  ): CollectionReference {
    return collection(db, path, ...pathSegments);
  }

  return {
    createDocRef,
    createCollection,
    addDocCallback,
    setDocCallback,
    updateDocCallback,
    deleteDocCallback,
    getDocCallback,
    queryDocCallback,
    queryPaginationCallback,
    onTransactionCallback,
    addDocAsync,
    setDocAsync,
    updateDocAsync,
    deleteDocAsync,
    getDocAsync,
    queryDocAsync,
    queryPaginationAsync,
    mapToDocumentData,
    convertToDocumentData
  };
};

