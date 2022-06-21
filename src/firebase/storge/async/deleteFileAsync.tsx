import { deleteObject, StorageReference } from "firebase/storage";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const DeleteFileAsync = (ref: StorageReference) =>
  FunctionAsyncReturnError(async () => {
    await deleteObject(ref);
    return true;
  });

export default DeleteFileAsync;
