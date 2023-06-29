import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";

const rootRedeucer = combineReducers({
  user: userSlice,
});

export const store = configureStore({
  reducer: rootRedeucer,
  devTools: true,
});
