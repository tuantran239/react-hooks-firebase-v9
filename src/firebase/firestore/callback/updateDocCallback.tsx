import { useState } from "react";
import { updateDoc, DocumentReference } from "firebase/firestore";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";

type Param = {
  doc: DocumentReference;
  value: any;
  onCompleted?: () => void;
  onError?: (error: any) => void;
};

const UpdateDocCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateDocFunc: FunctionParamCallback<Param> = ({
    doc,
    value,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    updateDoc(doc, value)
      .then(() => {
        setLoading(false);
        if (onCompleted) {
          onCompleted();
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

  return [updateDocFunc, { loading, error }];
};

export default UpdateDocCallback;
