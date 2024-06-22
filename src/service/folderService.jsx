import { createAsyncThunk } from "@reduxjs/toolkit";
import { addData, deleteData, getData } from "../baseApi/baseApi";
import { getCurrentToken } from "../sharedFunction";

export const listFolder = createAsyncThunk(
  "folder/list",
  async (_, { rejectWithValue }) => {
    try {
      const token = getCurrentToken();
      const response = await getData("folder", token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addFolder = createAsyncThunk(
  "folder/add",
  async (data, { rejectWithValue }) => {
    try {
      const token = getCurrentToken();
      const response = await addData("folder", token, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteFolder = createAsyncThunk(
  "folder/delete",
  async (data, { rejectWithValue }) => {
    try {
      const token = getCurrentToken();
      const response = await deleteData("folder", token, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
