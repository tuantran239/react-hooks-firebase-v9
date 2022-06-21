import { useState } from "react";
import {
  getDoc,
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";

type Param = {
  doc: DocumentReference;
  onCompleted?: (data: DocumentSnapshot<DocumentData>) => void;
  onError?: (error: any) => void;
};

const GetDocCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<DocumentSnapshot<DocumentData>>();

  const getDocFunc: FunctionParamCallback<Param> = ({
    doc,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    getDoc(doc)
      .then((snapshot) => {
        setLoading(false);
        setData(snapshot);
        if (onCompleted) {
          onCompleted(snapshot);
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

  return [getDocFunc, { data, loading, error }];
};

export default GetDocCallback;
