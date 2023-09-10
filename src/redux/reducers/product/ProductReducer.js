import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';

const listProductSlice = createSlice({
  name: 'listproducts',
  initialState: {status: 'idle', products: [], message: ''},
  reducers: {
    handleStatusProducts: (state,action) => {
      state.status = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.products = action.payload.data;
          state.status = 'idle';
        } else {
          state.status = 'loading';
        }
      });
  },
});

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await api.get('/product/list/all');
    return res.data;
  },
);
export const {handleStatusProducts} = listProductSlice.actions;
export default listProductSlice.reducer;
