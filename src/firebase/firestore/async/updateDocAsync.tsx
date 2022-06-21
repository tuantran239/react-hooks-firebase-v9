import { updateDoc, DocumentReference } from "firebase/firestore";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const UpdateDocAsync = (doc: DocumentReference, value: any) =>
FunctionAsyncReturnError(async () => {
  await updateDoc(doc, value);
    return true;
})

export default UpdateDocAsync;
