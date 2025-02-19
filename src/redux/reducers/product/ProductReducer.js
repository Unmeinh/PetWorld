import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';
import {
  GetProducts,
  GetProductsByIdShop,

} from '../../../api/RestApi';

const listProductSlice = createSlice({
  name: 'listproducts',
  initialState: {
    status: 'idle',
    products: [],
    message: '',
    productsShop: [],
    statusProductsShop: 'idle',
    listProduct: [],
  },
  reducers: {
    handleStatusProducts: (state, action) => {
      state.status = action.payload;
    },
    setDataProductsByShop: (state, action) => {
      state.statusProductsShop = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.products = [...state.products, ...action.payload.data];
          state.status = 'idle';
        } else {
          state.status = 'loading';
        }
      })
      .addCase(fetchProductsByIdShop.pending, (state, action) => {
        state.statusProductsShop = 'loading';
      })
      .addCase(fetchProductsByIdShop.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.productsShop = action.payload.data;
          state.statusProductsShop = 'idle';
        } else {
          state.statusProductsShop = 'loading';
        }
      })
  },
});

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page = 1) => {
    const res = await GetProducts(page);
    return res;
  },
);
export const fetchProductsByIdShop = createAsyncThunk(
  'products/fetchProductsByIdShop',
  async id => {
    const res = await GetProductsByIdShop(id);
    return res;
  },
);
export const {handleStatusProducts, setDataProductsByShop} =
  listProductSlice.actions;
export default listProductSlice.reducer;
