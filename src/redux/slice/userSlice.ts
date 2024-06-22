import { createSlice } from "@reduxjs/toolkit";
import { LoginUser, UserRegister } from "../../service/userService";
import Cookies from "js-cookie";

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      Cookies.set("TokenUser", action.payload.data.token, {
        secure: true,
        sameSite: "Strict",
      });
      localStorage.setItem("info", JSON.stringify(action.payload.data.info));
    });
    builder.addCase(LoginUser.rejected, (state) => {
      state.isFetching = false;
      state.error = true;
    });
    builder.addCase(UserRegister.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(UserRegister.fulfilled, (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    });
    builder.addCase(UserRegister.rejected, (state) => {
      state.isFetching = false;
      state.error = true;
    });
  },
});

// Action creators are generated for each case reducer function

export default userSlice.reducer;
