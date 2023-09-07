import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../api/axios.config';

const listPetSlice = createSlice({
    name:'listpet',
    initialState: {status: 'idle', pets: [], message: ''},
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(fetchPets.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(fetchPets.fulfilled, (state, action) => {
          if (action.payload.success === true) {
            state.pets = action.payload.data;
            state.status = 'idle';
          } else {
            state.status = 'loading';
          }
        });
    },
  });

  export const fetchPets = createAsyncThunk(
    'pets/fetchPets',
    async () => {
      const res = await api.get('/pet/list/all');
      return res.data;
    },
  );
export default listPetSlice.reducer