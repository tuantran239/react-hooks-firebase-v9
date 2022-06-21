import {
  createUserWithEAPAsync,
  getAuthAsync,
  sendEmailVerificationAsync,
  sendPasswordResetEmailAsync,
  signInWithEAPAsync,
  signInWithProviderAsync,
  updateProfileAsync,
  signOutAsync
} from "./async/authAsync";

import {
  addDocAsync,
  deleteDocAsync,
  getDocAsync,
  queryDocAsync,
  setDocAsync,
  updateDocAsync,
  queryPaginationAsync
} from "./async/firestoreAsync";

import {
  deleteFileAsync,
  deleteManyFilesAsync,
  downloadUrlAsync,
  uploadFileAsync,
} from "./async/storageAsync";

import { mapToDocumentData, convertToDocumentData } from "../utils/map";

class AuthFirebase {
  getAuth = getAuthAsync;

  updateProfile = updateProfileAsync;

  createUserWithEAP = createUserWithEAPAsync;

  signInWithEAP = signInWithEAPAsync;

  signInWithProvider = signInWithProviderAsync;

  sendPasswordResetEmail = sendPasswordResetEmailAsync;

  sendEmailVerification = sendEmailVerificationAsync;

  signOut = signOutAsync;
}

class Firestore {
  getDoc = getDocAsync;
  
  setDoc = setDocAsync;

  addDoc = addDocAsync;

  updateDoc = updateDocAsync;

  deleteDoc = deleteDocAsync;

  query = queryDocAsync;

  queryPagination = queryPaginationAsync;

  mapToDocumentData = mapToDocumentData;

  convertToDocumentData = convertToDocumentData;
}

class Storage {
  deleteFile = deleteFileAsync;

  deleteManyFile = deleteManyFilesAsync;

  downloadUrl = downloadUrlAsync;

  uploadFile = uploadFileAsync;
}

class Transaction {
  firestore = new Firestore();
  storage = new Storage();
  auth = new AuthFirebase();
}

export default Transaction;
