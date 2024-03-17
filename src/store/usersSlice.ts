import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../entities';
import { RootState } from './store';

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const { data } = await axios.get('/users');
  return data;
});

export const createUser = createAsyncThunk(
  'users/create',
  async (name: string) => {
    const { data } = await axios.post('/users', { name });
    return data;
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
  },
  reducers: {},
});

export const usersSelector = (state: RootState) => state.users;
export const selectedUserSelector = (state: RootState) =>
  state.users.selectedUser;
export const loadingSelector = (state: RootState) => state.users.loading;
export const errorSelector = (state: RootState) => state.users.error;

export default userSlice.reducer;
