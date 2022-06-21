import { useState } from "react";
import {
  StorageReference,
  list,
  ListResult,
  ListOptions,
} from "firebase/storage";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";

type Param = {
  ref: StorageReference;
  options?: ListOptions;
  onCompleted?: (data: ListResult) => void;
  onError?: (error: any) => void;
};

const ListFilesLimitCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<ListResult>();

  const listFilesLimitFunc: FunctionParamCallback<Param> = ({
    ref,
    options,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    list(ref, options)
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
  return [listFilesLimitFunc, { loading, error, data }];
};

export default ListFilesLimitCallback;
