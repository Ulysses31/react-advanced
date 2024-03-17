import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";

export const createStore = () =>
  configureStore({
    reducer: {
      users: usersReducer,
    },
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
