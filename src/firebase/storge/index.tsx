import uploadFileCallback from "./callback/uploadFileCallback";
import listAllFilesCallback from "./callback/listFilesLimitCallback";
import listFilesLimitCallback from "./callback/uploadFileCallback";
import downloadUrlCallback from "./callback/downloadUrlCallback";
import deleteFileCallback from "./callback/deleteFileCallback";

import deleteFileAsync from "./async/deleteFileAsync";
import deleteManyFilesAsync from "./async/deleteManyFilesAsync";
import uploadFileAsync from "./async/uploadFileAsync";
import downloadUrlAsync from "./async/downloadUrlAsync";

import { getStorage, ref } from "firebase/storage";
import { useContext } from "react";
import appContext from "..";

export const useStorage = () => {
  const { app } = useContext(appContext);

  const storage = getStorage(app);

  function createStorageRef(url?: string) {
    return ref(storage, url);
  }

  return {
    createStorageRef,
    uploadFileCallback,
    listAllFilesCallback,
    listFilesLimitCallback,
    downloadUrlCallback,
    deleteFileCallback,
    deleteFileAsync,
    deleteManyFilesAsync,
    uploadFileAsync,
    downloadUrlAsync,
  };
};
