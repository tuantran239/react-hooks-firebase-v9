import { useState } from "react";
import { StorageReference, listAll, ListResult } from "firebase/storage";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";

type Param = {
  ref: StorageReference;
  onCompleted?: (data: ListResult) => void;
  onError?: (error: any) => void;
};

const ListAllFilesCallback: FunctionCallback<
  Param, Process
> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<ListResult>();

  const listAllFilesFunc: FunctionParamCallback<Param> = ({
    ref,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    listAll(ref)
      .then((res) => {
        setLoading(false);
        setData(res);
        if (onCompleted) {
          onCompleted(res);
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
  return [listAllFilesFunc, { loading, error, data }];
};

export default ListAllFilesCallback;
