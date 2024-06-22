import { useParams } from "react-router-dom";
import { store } from "../redux/store";
import { addFolder, listFolder } from "../service/folderService";
import { listNote } from "../service/noteService";

export const listFolderLoader = async () => {
  try {
    const result: any = await store.dispatch(listFolder()).unwrap();
    return result.data;
  } catch (error) {
    console.error("Error loading folders:", error);
    return null;
  }
};
