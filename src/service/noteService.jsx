import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentToken } from "../sharedFunction";
import { addData, deleteData, getData, updateData } from "../baseApi/baseApi";

export const listNote = createAsyncThunk(
  "notes/list",
  async (noteId, { rejectWithValue }) => {
    try {
      const token = getCurrentToken();
      const response = await getData("notes", token, {
        folderId: `${noteId}`,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addNote = createAsyncThunk(
  "notes/add",
  async (data, { rejectWithValue }) => {
    try {
      const token = getCurrentToken();
      const response = await addData("notes", token, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const editTitleNote = createAsyncThunk(
  "notes/editTitle",
  async ({ newTitle, idNote }, { rejectWithValue }) => {
    try {
      const token = getCurrentToken();
      const response = await updateData(`notes/${idNote}`, token, { newTitle });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/delete",
  async ({ idNote }, { rejectWithValue }) => {
    try {
      const token = getCurrentToken();
      const response = await deleteData(`notes/${idNote}`, token, {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const activeNote = createAsyncThunk(
  "notes/active",
  async ({ active, idNote }, { rejectWithValue }) => {
    try {
      const token = getCurrentToken();

      const response = await updateData(`notes/active/${idNote}`, token, {
        active,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateContentNote = createAsyncThunk(
  "notes/updateContent",
  async ({ idNote, content }, { rejectWithValue }) => {
    try {
      const token = getCurrentToken();
      const response = await updateData(`notes/content/${idNote}`, token, {
        content,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
