import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CategoryDto } from '../entities';
import CategoriesService from '../services/categories.service';
import { RootState } from './store';

export interface CategoryState {
  browse: CategoryDto[];
  load: CategoryDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  browse: [],
  load: null,
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<CategoryDto[]>(
  'categories/fetch',
  async () => {
    const data = await new CategoriesService().findAll();
    return data;
  }
);

export const fetchCategoryById = createAsyncThunk<CategoryDto>(
  'categories/fetchById',
  async (id: any) => {
    const data = await new CategoriesService().findById(id);
    return data;
  }
);

export const createCategory = createAsyncThunk(
  'categories/create',
  async (dto: CategoryDto) => {
    const data = await new CategoriesService().create(dto);
    return data;
  }
);

export const updateCategory = createAsyncThunk(
  'categories/update',
  async (dto: CategoryDto) => {
    const data = await new CategoriesService().update(dto.id, dto);
    return data;
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id: number) => {
    await new CategoriesService().delete(id);
  }
);

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    //************ fetchCategories  *********************************/
    builder.addCase(fetchCategories.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      // state.loading = false;
      // state.categories = action.payload;
      return { ...state, loading: false, browse: action.payload };
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ fetchCategories  *********************************/

    //************ fetchCategoryById  ******************************/
    builder.addCase(fetchCategoryById.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
      // state.loading = false;
      // state.categories = action.payload;
      return { ...state, loading: false, load: action.payload };
    });
    builder.addCase(fetchCategoryById.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ fetchCategoryById  ******************************/

    //************ createCategory  *********************************/
    builder.addCase(createCategory.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      // state.loading = false;
      // state.categories = action.payload;
      return {
        ...state,
        loading: false,
        browse: [...state.browse, action.payload],
      };
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ createCategory  ********************************/

    //************ updateCategory  *********************************/
    builder.addCase(updateCategory.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      // state.loading = false;
      // state.categories = action.payload;
      return {
        ...state,
        loading: false,
        load: action.payload,
      };
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ updateCategory  ********************************/

    //************ deleteCategory  *********************************/
    builder.addCase(deleteCategory.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      // state.loading = false;
      // state.categories = action.payload;
      return {
        ...state,
        loading: false,
        categories: state.browse.filter(
          (category) => category.id !== Number(action.payload)
        ),
      };
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ deleteCategory  ********************************/
  },
  reducers: {},
});

export const categoriesSelector = (state: RootState) => state.categories;
export const selectedCategorySelector = (state: RootState) =>
  state.categories.load;
export const loadingSelector = (state: RootState) => state.categories.loading;
export const errorSelector = (state: RootState) => state.categories.error;

export default categorySlice.reducer;
