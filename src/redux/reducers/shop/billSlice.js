import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';
import {navigate} from '../../../navigation/rootNavigation';

const billSlice = createSlice({
  name: 'bill',
  initialState: {
    status: 'idle',
    price: {
      priceTotal: 0,
      discount: 0,
    },
    ship: 0,
    message: '',
    bills: [],
  },
  reducers: {
    addPrice: (state, action) => {
      state.price.priceTotal = action.payload.priceTotal;
      state.price.discount = action.payload.discount;
    },
    setShip: (state, action) => {
      state.ship += action.payload;
    },
  },
  extraReducers: bulder => {
    bulder
      .addCase(createBill.pending, (state, action) => {
        // state.status = 'loading';
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.bills = action.payload;
        state.status = 'idle';
        navigate('BillScreen', {idName: 3});
      });
  },
});

export const createBill = createAsyncThunk('bill/createBill', async data => {
  const res = api.post('/bill-product/insert', data);
  return res.data;
});
export const {addPrice, setShip} = billSlice.actions;
export default billSlice.reducer;
