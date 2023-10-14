import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';
import {navigate} from '../../../navigation/rootNavigation';

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
    statusChange:false
  },
  reducers: {
    addPrice: (state, action) => {
      state.price.priceTotal = action.payload.priceTotal;
      state.price.discount = action.payload.discount;
    },
    setShip: (state, action) => {
      state.ship += action.payload;
    },
    setStatusChangeBill:(state, action) => {
      state.statusChange = action.payload
    }
  },
  extraReducers: bulder => {
    bulder
      .addCase(createBill.pending, (state, action) => {
        state.status = true;
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.statusChange = true
        state.status = false;
        state.bills = action.payload;
      });
  },
});

export const createBill = createAsyncThunk('bill/createBill', async data => {
  const res = api.post('/bill-product/insert', data);
  return res.data;
});
export const {addPrice, setShip ,setStatusChangeBill} = billSlice.actions;
export default billSlice.reducer;
