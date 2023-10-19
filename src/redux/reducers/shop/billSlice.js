import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';

const billSlice = createSlice({
  name: 'bill',
  initialState: {
    status: false,
    price: {
      priceTotal: 0,
      discount: 0,
    },
    ship: 0,
    message: '',
    bills: [],
    statusChange: false,
    payments: [],
  },
  reducers: {
    addPrice: (state, action) => {
      state.price.priceTotal = action.payload.priceTotal;
      state.price.discount = action.payload.discount;
    },
    setShip: (state, action) => {
      state.ship += action.payload;
    },
    setStatusChangeBill: (state, action) => {
      state.statusChange = action.payload;
    },
  },
  extraReducers: bulder => {
    bulder
      .addCase(createBill.pending, (state, action) => {
        state.status = true;
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.statusChange = true;
        state.status = false;
        state.bills = action.payload;
      })
      .addCase(getPayments.pending, (state, action) => {
        state.status = true;
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.status = false;
        state.payments = action.payload?.data;
      });
  },
});

export const createBill = createAsyncThunk('bill/createBill', async data => {
  const res = await api.post('/bill-product/insert', data);
  return res.data;
});
export const getPayments = createAsyncThunk('bill/getPayment', async () => {
  const res = await api.get('/server/payments');
  return res.data;
});
export const {addPrice, setShip, setStatusChangeBill} = billSlice.actions;
export default billSlice.reducer;
