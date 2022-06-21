import { StorageReference, getDownloadURL } from "firebase/storage";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const DownloadUrlAsync = (ref: StorageReference) =>
  FunctionAsyncReturnError(async () => {
    const url = await getDownloadURL(ref);
    return url;
  });

export default DownloadUrlAsync;
