import { getDoc, DocumentReference } from "firebase/firestore";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const GetDocAsync = (doc: DocumentReference) =>
  FunctionAsyncReturnError(async () => {
    const snapshot = await getDoc(doc);
    return snapshot;
  });

export default GetDocAsync;
