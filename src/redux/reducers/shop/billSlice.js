import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';
import axios from 'axios';
import {GetBills, GetPayments, InsertBill} from '../../../api/RestApi';

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
    province: [],
    district: [],
    wards: [],
    billUnsuccess: [],
    billSuccess: [],
    billDelivering: [],
    billDelivered: [],
    billLoading: {
      billUnsuccess: false,
      billSuccess: false,
      billDelivering: false,
      billDelivered: false,
    },
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
    clearLocations: (state, action) => {
      state.wards = [];
      state.district = [];
      state.province = [];
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
      })
      .addCase(getProvince.pending, (state, action) => {
        state.status = true;
      })
      .addCase(getProvince.fulfilled, (state, action) => {
        state.status = false;
        state.province = action.payload?.map(item => ({
          label: item.name,
          value: item.code,
        }));
      })
      .addCase(getDistrict.pending, (state, action) => {
        state.status = true;
      })
      .addCase(getDistrict.fulfilled, (state, action) => {
        state.status = false;
        (state.wards = []),
          (state.district = action.payload?.districts?.map(item => ({
            label: item.name,
            value: item.code,
          })));
      })
      .addCase(getWards.pending, (state, action) => {
        state.status = true;
      })
      .addCase(getWards.fulfilled, (state, action) => {
        state.status = false;
        state.wards = action.payload?.wards?.map(item => ({
          label: item.name,
          value: item.code,
        }));
      })
      .addCase(getBillUnSuccess.pending, (state, action) => {
        state.billLoading.billUnsuccess = true;
      })
      .addCase(getBillUnSuccess.fulfilled, (state, action) => {
        state.billLoading.billUnsuccess = false;
        if (action.payload.success) {
          state.billUnsuccess = action.payload.data;
        }
      })
      .addCase(getBillSuccess.pending, (state, action) => {
        state.billLoading.billSuccess = true;
      })
      .addCase(getBillSuccess.fulfilled, (state, action) => {
        state.billLoading.billSuccess = false;
        if (action.payload.success) {
          state.billSuccess = action.payload.data;
        }
      })
      .addCase(getBillDelivering.pending, (state, action) => {
        state.billLoading.billDelivering = true;
      })
      .addCase(getBillDelivering.fulfilled, (state, action) => {
        state.billLoading.billDelivering = false;
        if (action.payload.success) {
          state.billDelivering = action.payload.data;
        }
      })
      .addCase(getBillDelivered.pending, (state, action) => {
        state.billLoading.billDelivered = true;
      })
      .addCase(getBillDelivered.fulfilled, (state, action) => {
        state.billLoading.billDelivered = false;
        if (action.payload.success) {
          state.billDelivered = action.payload.data;
        }
      });
  },
});

export const createBill = createAsyncThunk('bill/createBill', async data => {
  const res = await InsertBill(data);
  return res;
});
export const getPayments = createAsyncThunk('bill/getPayment', async () => {
  const res = await GetPayments();
  return res;
});

export const getBillUnSuccess = createAsyncThunk(
  'bill/getBillUnSuccess',
  async () => {
    const res = await GetBills(0);
    return res;
  },
);
export const getBillSuccess = createAsyncThunk(
  'bill/getBillSuccess',
  async () => {
    const res = await GetBills(1);
    return res;
  },
);
export const getBillDelivering = createAsyncThunk(
  'bill/getBillDelivering',
  async () => {
    const res = await GetBills(2);
    return res;
  },
);
export const getBillDelivered = createAsyncThunk(
  'bill/getBillDelivered',
  async () => {
    const res = await GetBills(3);
    return res;
  },
);

export const getProvince = createAsyncThunk('user/province', async () => {
  const res = await axios.get('https://provinces.open-api.vn/api/p/');
  return res.data;
});
export const getDistrict = createAsyncThunk('user/district', async id => {
  const res = await axios.get(
    `https://provinces.open-api.vn/api/p/${id}?depth=2`,
  );
  return res.data;
});
export const getWards = createAsyncThunk('user/wards', async id => {
  const res = await axios.get(
    `https://provinces.open-api.vn/api/d/${id}?depth=2`,
  );
  return res.data;
});
export const {addPrice, setShip, setStatusChangeBill, clearLocations} =
  billSlice.actions;
export default billSlice.reducer;
