import {
  StorageReference,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const UploadFileAsync = (
  ref: StorageReference,
  file: Blob | Uint8Array | ArrayBuffer
) =>
  FunctionAsyncReturnError(async () => {
    const snapshot = await uploadBytesResumable(ref, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  });

export default UploadFileAsync;
