import { useState } from "react";
import { deleteDoc, DocumentReference } from "firebase/firestore";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";

type Param = {
  doc: DocumentReference;
  onCompleted?: () => void;
  onError?: (error: any) => void;
};

const DeleteDocCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setDocFunc: FunctionParamCallback<Param> = ({
    doc,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    deleteDoc(doc)
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
  return [setDocFunc, { loading, error, data: "" }];
};

export default DeleteDocCallback;
