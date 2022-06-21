import { useState } from "react";
import {
  StorageReference,
  deleteObject
} from "firebase/storage";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";

type Param = {
  ref: StorageReference;
  onCompleted?: (data: boolean) => void;
  onError?: (error: any) => void;
};

const DeleteFileCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<boolean>(false);

  const deleteFileFunc: FunctionParamCallback<Param> = ({
    ref,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    deleteObject(ref)
      .then(() => {
        setLoading(false);
        setData(true);
        if (onCompleted) {
          onCompleted(true);
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
  return [deleteFileFunc, { loading, error, data }];
};

export default DeleteFileCallback;
