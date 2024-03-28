import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import recordsReducer from './recordsSlice';
import usersReducer from './usersSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      categories: categoriesReducer,
      records: recordsReducer,
      users: usersReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
