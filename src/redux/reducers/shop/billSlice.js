import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
const billSlice = createSlice({
  name: 'bill',
  initialState: {
    status: 'idle',
    price: {
      priceTotal: 0,
      discount: 0,
    },
    ship:0,
    message: '',
  },
  reducers: {
    addPrice: (state, action) => {
      state.price.priceTotal = action.payload.priceTotal;
      state.price.discount = action.payload.discount;
    },
    setShip: (state, action) => {
      state.ship += action.payload;
      
    }
  },
});
export const {addPrice,setShip} = billSlice.actions;
export default billSlice.reducer;
