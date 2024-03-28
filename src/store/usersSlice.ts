import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserDto } from '../entities';
import UsersService from '../services/users.service';
import { RootState } from './store';

export interface UserState {
  browse: UserDto[];
  load: UserDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  browse: [],
  load: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<UserDto[]>(
  'users/fetch',
  async () => {
    const data = await new UsersService().findAll();
    return data;
  }
);

export const fetchUserById = createAsyncThunk<UserDto>(
  'users/fetchById',
  async (id: any) => {
    const data = await new UsersService().findById(id);
    return data;
  }
);

export const createUser = createAsyncThunk(
  'users/create',
  async (dto: UserDto) => {
    const data = await new UsersService().create(dto);
    return data;
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async (dto: UserDto) => {
    const data = await new UsersService().update(dto.id, dto);
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id: number) => {
    await new UsersService().delete(id);
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    //************ fetchUsers  *********************************/
    builder.addCase(fetchUsers.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // state.loading = false;
      // state.users = action.payload;
      return { ...state, loading: false, browse: action.payload };
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ fetchUsers  *********************************/

    //************ fetchUserById  ******************************/
    builder.addCase(fetchUserById.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // state.loading = false;
      // state.users = action.payload;
      return { ...state, loading: false, load: action.payload };
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ fetchUserById  ******************************/

    //************ createUser  *********************************/
    builder.addCase(createUser.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      // state.loading = false;
      // state.users = action.payload;
      return {
        ...state,
        loading: false,
        browse: [...state.browse, action.payload],
      };
    });
    builder.addCase(createUser.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ createUser  ********************************/

    //************ updateUser  *********************************/
    builder.addCase(updateUser.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      // state.loading = false;
      // state.users = action.payload;
      return {
        ...state,
        loading: false,
        load: action.payload,
      };
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ updateUser  ********************************/

    //************ deleteUser  *********************************/
    builder.addCase(deleteUser.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      // state.loading = false;
      // state.users = action.payload;
      return {
        ...state,
        loading: false,
        browse: state.browse.filter(
          (user) => user.id !== Number(action.payload)
        ),
      };
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ deleteUser  ********************************/
  },
  reducers: {},
});

export const usersSelector = (state: RootState) => state.users;
export const selectedUserSelector = (state: RootState) => state.users.load;
export const loadingSelector = (state: RootState) => state.users.loading;
export const errorSelector = (state: RootState) => state.users.error;

export default userSlice.reducer;
