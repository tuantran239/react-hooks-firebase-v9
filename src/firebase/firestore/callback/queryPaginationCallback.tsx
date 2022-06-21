import { useState } from "react";
import {
  CollectionReference,
  query,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import {
  FunctionCallback,
  FunctionParamCallback,
  Process,
  Pagination,
} from "../../base";
import { mapToQueryConstraintArray } from "../../utils/map";
import { getNumberOfPage } from "../../utils/getNumberOfPage";

type Param = {
  collection: CollectionReference;
  pagination: Pagination;
  onCompleted?: (data: QuerySnapshot<DocumentData>) => void;
  onError?: (error: any) => void;
};

const QueryPaginationCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<QuerySnapshot<DocumentData> | null>(null);

  const queryDocFunc: FunctionParamCallback<Param> = ({
    collection,
    pagination,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    const queryAll = query(
      collection,
      ...mapToQueryConstraintArray({
        orderBy: pagination.orderBy,
      })
    );
    getDocs(queryAll)
      .then((snapshot) => {
        let start = 0;
        const allDocs = snapshot.docs;
        // if (allDocs.length < pagination.limit) {
        //   throw new Error("number of docs must be greater than or equal to pagination limit");
        // }
        const numberOfPage = getNumberOfPage(allDocs.length, pagination.limit);
        if (pagination.page > numberOfPage) {
          pagination.page = numberOfPage;
        }
        if (pagination.page > 0) {
          start = pagination.limit * pagination.page - pagination.limit;
        }
        const lastVisible = allDocs[start === 0 ? 0 : start - 1];
        const q = query(
          collection,
          ...mapToQueryConstraintArray({
            orderBy: pagination.orderBy,
            startAt: start === 0 ? lastVisible : undefined,
            startAfter: start !== 0 ? lastVisible : undefined,
            limit: pagination.limit,
            where: pagination.where
          })
        );
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

export default QueryPaginationCallback;
