import { useState } from "react";
import { setDoc, DocumentReference } from "firebase/firestore";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";

type Param = {
  doc: DocumentReference;
  value: any;
  onCompleted?: () => void;
  onError?: (error: any) => void;
};

const SetDocCallback: FunctionCallback<Param, Process> = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setDocFunc: FunctionParamCallback<Param> = ({
    doc,
    value,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    setDoc(doc, value)
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
  
  return [setDocFunc, { loading, error }];
};

export default SetDocCallback;
