import {
  StorageReference,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
  UploadTask,
} from "firebase/storage";
import { useState } from "react";
import { FunctionCallback, FunctionParamCallback, Process } from "../../base";

type Param = {
  ref: StorageReference;
  file: Blob | Uint8Array | ArrayBuffer;
  onCompleted?: (data: any) => void;
  onError?: (error: any) => void;
};

export interface ProcessUploadFile extends Process {
  progress?: number;
  pause?: () => void;
  resume?: () => void;
  cancel?: () => void;
}

const UploadFile: FunctionCallback<Param, ProcessUploadFile> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StorageError | null>(null);
  const [data, setData] = useState<string>();
  const [progress, setProgress] = useState(0);
  const [uploadTsk, setUploadTask] = useState<UploadTask | null>(null);

  const pause = () => {
    if (uploadTsk) {
      setLoading(false);
      uploadTsk.pause();
    }
  };

  const resume = () => {
    if (uploadTsk) {
      setLoading(true);
      uploadTsk.resume();
    }
  };

  const cancel = () => {
    if (uploadTsk) {
      setLoading(false);
      setProgress(0);
      uploadTsk.cancel();
    }
  };

  const uploadFunc: FunctionParamCallback<Param> = ({
    ref,
    file,
    onCompleted,
    onError,
  }) => {
    const uploadTask = uploadBytesResumable(ref, file);
    setLoading(true);
    setUploadTask(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pro = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(pro);
      },
      (error) => {
        setLoading(false);
        setUploadTask(null);
        setError(error);
        if (onError) {
          onError(error);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLoading(false);
          setUploadTask(null);
          setData(downloadURL);
          if (onCompleted) {
            onCompleted(downloadURL);
          }
        });
      }
    );
  };

  return [
    uploadFunc,
    { loading, progress, error, data, pause, cancel, resume },
  ];
};

export default UploadFile;
