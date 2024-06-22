import { createSlice } from "@reduxjs/toolkit";
import {
  activeNote,
  addNote,
  deleteNote,
  editTitleNote,
  listNote,
  updateContentNote,
} from "../../service/noteService";

interface Note {
  _id: string;
  idNote: string;
  title: string;
  content: string;
  idFolder: string;
  statue: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface NoteState {
  notes: Note[];
}

const initialState: NoteState = {
  notes: [],
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listNote.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.notes = [action.payload, ...state.notes];
    });
    builder.addCase(editTitleNote.fulfilled, (state, action) => {
      const updatedNote = action.payload;
      const noteIndex = state.notes.findIndex(
        (note) => note.idNote === updatedNote.idNote
      );
      if (noteIndex !== -1) {
        state.notes[noteIndex].title = updatedNote.title;
      }
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      let newArrNote = [...state.notes];
      let index = newArrNote.findIndex(
        (item) => item.idNote === action.payload.idNote
      );
      newArrNote.splice(index, 1);
      state.notes = newArrNote;
    });
    builder.addCase(activeNote.fulfilled, (state, action) => {
      const updatedNote = action.payload;
      const noteIndex = state.notes.findIndex(
        (note) => note.idNote === updatedNote.idNote
      );
      if (noteIndex !== -1) {
        state.notes[noteIndex].statue = updatedNote.statue;
      }
    });
    builder.addCase(updateContentNote.fulfilled, (state, action) => {
      const updatedNote = action.payload;
      const noteIndex = state.notes.findIndex(
        (note) => note.idNote === updatedNote.idNote
      );
      if (noteIndex !== -1) {
        state.notes[noteIndex].content = updatedNote.content;
      }
    });
  },
});

export default noteSlice.reducer;
