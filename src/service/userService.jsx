/* eslint-disable no-undef */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const LoginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}${"users/login"}`, {
        email,
        password,
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const UserRegister = createAsyncThunk(
  "user/register",
  async ({ userName, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}${"users/register"}`, {
        email,
        password,
        userName,
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const RefToken = async () => {
  try {
    const res = await axios.post(`${BASE_URL}users/refresh`);
    return res?.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

export const Logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.post(`${BASE_URL}users/logout`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
});
