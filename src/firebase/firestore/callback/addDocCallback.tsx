import { useState } from "react";
import { addDoc, CollectionReference, DocumentReference } from "firebase/firestore";
import { FunctionParamCallback, FunctionCallback, Process } from "../../base";

type Param = {
  collection: CollectionReference;
  value: any;
  onCompleted?: (data?: DocumentReference<any>) => void;
  onError?: (error: any) => void;
}

const AddDocCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<DocumentReference<any>>();

  const addDocFunc: FunctionParamCallback<Param> = ({
    collection,
    value,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    addDoc(collection, value)
      .then((data) => {
        setLoading(false);
        setData(data);
        if (onCompleted) {
          onCompleted(data);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        if (onError) {
          onError(error);
        }
      });
  };

  return [addDocFunc, { loading, error, data }];
};

export default AddDocCallback;
