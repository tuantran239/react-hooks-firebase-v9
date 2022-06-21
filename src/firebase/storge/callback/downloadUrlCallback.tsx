import { useState } from "react";
import {
  StorageReference,
  getDownloadURL
} from "firebase/storage";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";

type Param = {
  ref: StorageReference;
  onCompleted?: (data: string) => void;
  onError?: (error: any) => void;
};

const DownloadUrlCallback: FunctionCallback<Param, Process> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<string>();

  const downloadUrlFunc: FunctionParamCallback<Param> = ({
    ref,
    onCompleted,
    onError,
  }) => {
    setLoading(true);
    getDownloadURL(ref)
      .then((url) => {
        setLoading(false);
        setData(url);
        if (onCompleted) {
          onCompleted(url);
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
  return [downloadUrlFunc, { loading, error, data }];
};

export default DownloadUrlCallback;
