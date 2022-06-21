import {
  addDoc,
  CollectionReference,
} from "firebase/firestore";
import { FunctionAsyncReturnError } from "../../utils/FunctionAsync";

const AddDocAsync = (collection: CollectionReference, value: any) =>
FunctionAsyncReturnError(async () => {
  const data = await addDoc(collection, value);
  return data;
})

export default AddDocAsync;
