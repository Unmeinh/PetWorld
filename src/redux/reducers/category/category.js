import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';
import { GetCategorys, ListProductByCategory } from '../../../api/RestApi';
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    status: 'idle',
    categorys: [],
    message: '',
    data: [],
    statusData: 'idle',
  },
  reducers: {
    setDataCategory: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategorys.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCategorys.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.categorys = action.payload.data;
          state.status = 'idle';
        } else {
          state.status = 'loading';
        }
      })
      .addCase(fetchDataFromCategory.pending, (state, action) => {
        state.statusData = 'loading';
        state.data = [];
      })
      .addCase(fetchDataFromCategory.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.data = action.payload.data;
          state.statusData = 'idle';
        } else {
          state.statusData = 'loading';
        }
      });
  },
});

export const fetchCategorys = createAsyncThunk(
  'category/fetchCategory',
  async () => {
    const res = await GetCategorys();
    return res;
  },
);
export const fetchDataFromCategory = createAsyncThunk(
  'category/fetchData',
  async id => {
    const res = await ListProductByCategory(id);
    return res;
  },
);
export const {setDataCategory} = categorySlice.actions;
export default categorySlice.reducer;
