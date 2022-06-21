import {
  deleteObject,
  getDownloadURL,
  StorageReference,
  uploadBytesResumable,
} from "firebase/storage";
import { FunctionAsyncThrowError } from "../../utils/FunctionAsync";

export const deleteFileAsync = (ref: StorageReference) =>
  FunctionAsyncThrowError(async () => {
    await deleteObject(ref);
    return true;
  });

export const deleteManyFilesAsync = (refs: StorageReference[]) =>
  FunctionAsyncThrowError(async () => {
    await Promise.all(refs.map((ref) => deleteObject(ref)));
    return true;
  });

export const downloadUrlAsync = (ref: StorageReference) =>
  FunctionAsyncThrowError(async () => {
    const url = await getDownloadURL(ref);
    return url;
  });

export const uploadFileAsync = (
  ref: StorageReference,
  file: Blob | Uint8Array | ArrayBuffer
) =>
  FunctionAsyncThrowError(async () => {
    const snapshot = await uploadBytesResumable(ref, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  });
