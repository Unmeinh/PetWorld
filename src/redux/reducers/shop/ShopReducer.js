import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';
import { GetShops } from '../../../api/RestApi';
const listShopSlice = createSlice({
  name: 'listShop',
  initialState: {status: 'idle', shops: [], message: ''},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchShops.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.shops = action.payload.data;
          state.status = 'idle';
        } else {
          state.status = 'loading';
        }
      });
  },
});
export const fetchShops = createAsyncThunk('shop/fetchShops', async () => {
  const res = await GetShops();
  return res;
});
export default listShopSlice.reducer;
