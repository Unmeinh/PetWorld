import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GetListBanner} from '../../api/RestApi';

const homeSlice = createSlice({
  name: 'home',
  initialState: {status: 'idle', dataBanner: [], message: ''},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBanner.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.success === true) {
          state.dataBanner = action.payload.data;
        }
      });
  },
});

export const fetchBanner = createAsyncThunk('home/fetchBanner', async () => {
  const res = await GetListBanner();
  return res;
});

export default homeSlice.reducer;

