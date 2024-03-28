import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RecordDto } from '../entities';
import RecordsService from '../services/records.service';
import { RootState } from './store';

export interface RecordState {
  browse: RecordDto[];
  load: RecordDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: RecordState = {
  browse: [],
  load: null,
  loading: false,
  error: null,
};

export const fetchRecords = createAsyncThunk<RecordDto[]>(
  'records/fetch',
  async () => {
    const data = await new RecordsService().findAll();
    return data;
  }
);

export const fetchRecordById = createAsyncThunk<RecordDto>(
  'records/fetchById',
  async (id: any) => {
    const data = await new RecordsService().findById(id);
    return data;
  }
);

export const createRecord = createAsyncThunk(
  'records/create',
  async (dto: RecordDto) => {
    const data = await new RecordsService().create(dto);
    return data;
  }
);

export const updateRecord = createAsyncThunk(
  'records/update',
  async (dto: RecordDto) => {
    const data = await new RecordsService().update(dto.id, dto);
    return data;
  }
);

export const deleteRecord = createAsyncThunk(
  'records/delete',
  async (id: number) => {
    await new RecordsService().delete(id);
  }
);

export const recordSlice = createSlice({
  name: 'records',
  initialState,
  extraReducers: (builder) => {
    //************ fetchRecords  *********************************/
    builder.addCase(fetchRecords.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(fetchRecords.fulfilled, (state, action) => {
      // state.loading = false;
      // state.records = action.payload;
      return { ...state, loading: false, browse: action.payload };
    });
    builder.addCase(fetchRecords.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ fetchRecords  *********************************/

    //************ fetchRecordById  ******************************/
    builder.addCase(fetchRecordById.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(fetchRecordById.fulfilled, (state, action) => {
      // state.loading = false;
      // state.records = action.payload;
      return { ...state, loading: false, load: action.payload };
    });
    builder.addCase(fetchRecordById.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ fetchRecordById  ******************************/

    //************ createRecord  *********************************/
    builder.addCase(createRecord.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(createRecord.fulfilled, (state, action) => {
      // state.loading = false;
      // state.records = action.payload;
      return {
        ...state,
        loading: false,
        browse: [...state.browse, action.payload],
      };
    });
    builder.addCase(createRecord.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ createRecord  ********************************/

    //************ updateRecord  *********************************/
    builder.addCase(updateRecord.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(updateRecord.fulfilled, (state, action) => {
      // state.loading = false;
      // state.records = action.payload;
      return {
        ...state,
        loading: false,
        load: action.payload,
      };
    });
    builder.addCase(updateRecord.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ updateRecord  ********************************/

    //************ deleteRecord  *********************************/
    builder.addCase(deleteRecord.pending, (state) => {
      // state.loading = true;
      // state.error = null;
      return { ...state, loading: true, error: null };
    });
    builder.addCase(deleteRecord.fulfilled, (state, action) => {
      // state.loading = false;
      // state.records = action.payload;
      return {
        ...state,
        loading: false,
        browse: state.browse.filter(
          (record) => record.id !== Number(action.payload)
        ),
      };
    });
    builder.addCase(deleteRecord.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message!;
      return { ...state, loading: false, error: action.error.message! };
    });
    //************ deleteRecord  ********************************/
  },
  reducers: {},
});

export const recordsSelector = (state: RootState) => state.records;
export const selectedRecordSelector = (state: RootState) => state.records.load;
export const loadingSelector = (state: RootState) => state.records.loading;
export const errorSelector = (state: RootState) => state.records.error;

export default recordSlice.reducer;
