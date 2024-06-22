import { createSlice } from "@reduxjs/toolkit";
import {
  addFolder,
  deleteFolder,
  listFolder,
} from "../../service/folderService";

interface Folder {
  _id: string;
  idFolder: string;
  name: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface FolderState {
  folders: Folder[];
}

const initialState: FolderState = {
  folders: [],
};

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listFolder.fulfilled, (state, action) => {
        state.folders = action.payload.data;
      })
      .addCase(addFolder.fulfilled, (state, action) => {
        state.folders = [action.payload, ...state.folders];
      })

      .addCase(deleteFolder.fulfilled, (state, action) => {
        let newArrFolder = [...state.folders];
        let index = newArrFolder.findIndex(
          (item) => item.idFolder === action.payload.idFolder
        );
        newArrFolder.splice(index, 1);
        state.folders = newArrFolder;
      });
  },
});

export default folderSlice.reducer;
