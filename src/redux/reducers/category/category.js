import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';
const categorySlice = createSlice({
  name: 'category',
  initialState: {status: 'idle', categorys: [], message: ''},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategorys.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCategorys.fulfilled, (state, action) => {
        if(action.payload.success === true) {
          state.categorys = action.payload.data;
          state.status = 'idle';
        }else{
          state.status = 'loading';
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
export default categorySlice.reducer;
