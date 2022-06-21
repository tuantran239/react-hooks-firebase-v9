import {
  addDoc,
  CollectionReference,
  deleteDoc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ConstraintObject, Pagination } from "../../base";
import { FunctionAsyncThrowError } from "../../utils/FunctionAsync";
import { getNumberOfPage } from "../../utils/getNumberOfPage";
import { mapToQueryConstraintArray } from "../../utils/map";

export const addDocAsync = (collection: CollectionReference, value: any) =>
  FunctionAsyncThrowError(async () => {
    const data = await addDoc(collection, value);
    return data;
  });

export const deleteDocAsync = (doc: DocumentReference) =>
  FunctionAsyncThrowError(async () => {
    await deleteDoc(doc);
    return true;
  });

export const getDocAsync = (doc: DocumentReference) =>
  FunctionAsyncThrowError(async () => {
    const snapshot = await getDoc(doc);
    return snapshot;
  });

export const queryDocAsync = (
  collection: CollectionReference,
  constraints: ConstraintObject
) =>
  FunctionAsyncThrowError(async () => {
    const q = query(collection, ...mapToQueryConstraintArray(constraints));
    const snapshot = await getDocs(q);
    return snapshot;
  });

export const queryPaginationAsync = (
  collection: CollectionReference,
  pagination: Pagination
) =>
  FunctionAsyncThrowError(async () => {
    const queryAll = query(
      collection,
      ...mapToQueryConstraintArray({
        orderBy: pagination.orderBy,
      })
    );
    const queryDocs = await getDocs(queryAll);
    let start = 0;
    const allDocs = queryDocs.docs;
    // if (allDocs.length < pagination.limit) {
    //   throw new Error("number of docs must be greater than or equal to pagination limit");
    // }
    const numberOfPage = getNumberOfPage(allDocs.length, pagination.limit);
    if (pagination.page > numberOfPage) {
      pagination.page = numberOfPage;
    }
    if (pagination.page > 0) {
      start = pagination.limit * pagination.page - pagination.limit;
    }
    const lastVisible = allDocs[start === 0 ? 0 : start - 1];
    const q = query(
      collection,
      ...mapToQueryConstraintArray({
        orderBy: pagination.orderBy,
        startAt: start === 0 ? lastVisible : undefined,
        startAfter: start !== 0 ? lastVisible : undefined,
        limit: pagination.limit,
        where: pagination.where
      })
    );
    const snapshot = await getDocs(q);
    return snapshot;
  });

export const setDocAsync = (doc: DocumentReference, value: any) =>
  FunctionAsyncThrowError(async () => {
    await setDoc(doc, value);
    return true;
  });

export const updateDocAsync = (doc: DocumentReference, value: any) =>
  FunctionAsyncThrowError(async () => {
    await updateDoc(doc, value);
    return true;
  });
