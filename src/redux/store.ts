import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import folderReducer from "./slice/folderSlice";
import notesReducer from "./slice/noteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    folders: folderReducer,
    notes: notesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
