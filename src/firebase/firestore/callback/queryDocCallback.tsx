import { useState } from "react";
import { CollectionReference, query, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";
import {
  FunctionCallback,
  FunctionParamCallback,
  ConstraintObject,
  Process,
} from "../../base";
import { mapToQueryConstraintArray } 
from "../../utils/map";

type Param = {
  collection: CollectionReference;
  constraints: ConstraintObject;
  onCompleted?: (data: QuerySnapshot<DocumentData>) => void;
  onError?: (error: any) => void;
};

const QueryDocCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<QuerySnapshot<DocumentData> | null>(null);

  const queryDocFunc: FunctionParamCallback<Param> = ({
    collection,
    constraints,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    const q = query(collection, ...mapToQueryConstraintArray(constraints));
    getDocs(q)
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

  return [queryDocFunc, { data, loading, error }];
};

export default QueryDocCallback;
