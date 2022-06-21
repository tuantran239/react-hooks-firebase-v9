import { setDoc, DocumentReference } from "firebase/firestore";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const SetDocAsync = (doc: DocumentReference, value: any) =>
FunctionAsyncReturnError(async () => {
  await setDoc(doc, value);
  return true;
})

export default SetDocAsync;
