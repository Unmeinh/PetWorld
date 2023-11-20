import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetAllFavorite, AddFavorite, DeleteFavorite } from '../../../api/RestApi';

const listFavoriteSlice = createSlice({
  name: 'listFavorite',
  initialState: { status: 'idle', data: [], message: '' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.success === true) {
          state.data = action.payload.data;
        }
      })
      .addCase(addFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.success === true) {
          state.data = action.payload.data;
        }
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.success === true) {
          state.data = action.payload.data;
        }
      });
  },
});

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async () => {
    const res = await GetAllFavorite();
    return res;
  },
);

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async (favoriteData) => {
    const res = await AddFavorite(favoriteData);
    return res;
  }
);

export const deleteFavorite = createAsyncThunk(
  'favorites/deleteFavorite',
  async (favoriteId) => {
    const res = await DeleteFavorite(favoriteId);
    return res;
  }
);

export default listFavoriteSlice.reducer;
