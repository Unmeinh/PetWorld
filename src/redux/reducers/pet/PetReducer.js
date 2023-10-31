import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';
import {GetPetByIdShop, GetPets} from '../../../api/RestApi';

const listPetSlice = createSlice({
  name: 'listpet',
  initialState: {
    status: 'idle',
    pets: [],
    message: '',
    petsByIdShop: [],
    statusPetByIdShop: 'idle',
  },
  reducers: {
    handleStatusPets: (state, action) => {
      state.status = action.payload;
    },
    setDataPetByShop: (state, action) => {
      state.petsByIdShop = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPets.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.pets = [...state?.pets, ...action.payload.data];
          state.status = 'idle';
        } else {
          state.status = 'loading';
        }
      })
      .addCase(fetchPetsByIdShop.pending, (state, action) => {
        state.statusPetByIdShop = 'loading';
      })
      .addCase(fetchPetsByIdShop.fulfilled, (state, action) => {
        state.statusPetByIdShop = 'idle';
        if (action.payload.success === true) {
          state.petsByIdShop = action.payload.data;
        }
      });
  },
});

export const fetchPets = createAsyncThunk(
  'pets/fetchPets',
  async (page = 1) => {
    const res = await GetPets(page);
    return res;
  },
);
export const fetchPetsByIdShop = createAsyncThunk(
  'pets/fetchPetsByIdShop',
  async id => {
    const res = await GetPetByIdShop(id);
    return res;
  },
);
export const {handleStatusPets, setDataPetByShop} = listPetSlice.actions;
export default listPetSlice.reducer;
