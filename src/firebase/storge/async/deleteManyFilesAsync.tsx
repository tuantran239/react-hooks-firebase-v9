import { deleteObject, StorageReference } from "firebase/storage";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const DeleteManyFilesAsync = (refs: StorageReference[]) =>
FunctionAsyncReturnError(async () => {
  await Promise.all(refs.map((ref) => deleteObject(ref)));
  return true;
})

export default DeleteManyFilesAsync;
