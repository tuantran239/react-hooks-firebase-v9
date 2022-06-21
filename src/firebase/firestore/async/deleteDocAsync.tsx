import { deleteDoc, DocumentReference } from "firebase/firestore";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const DeleteDocAsync = (doc: DocumentReference) =>
  FunctionAsyncReturnError(async () => {
    await deleteDoc(doc);
    return true;
  });

export default DeleteDocAsync;
