import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';
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
    const res = await api.get('/category/list/all');

    return res.data;
  },
);
export const fetchDataFromCategory = createAsyncThunk(
  'category/fetchData',
  async id => {
    const res = await api.get(`/category/list/product&pet/${id}`);
    return res.data;
  },
);
export const {setDataCategory} = categorySlice.actions;
export default categorySlice.reducer;
