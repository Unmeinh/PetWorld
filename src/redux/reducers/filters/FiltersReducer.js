import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';
import {
  GetDetailProduct,
  SeachProductForShop,
  SearchProduct,
} from '../../../api/RestApi';

const initialState = {
  search: '',
  idCategory: 0,
  filterProduct: {
    filterBy: [
      {
        id: 1,
        name: 'Được đề xuất',
        isSelected: true,
        icon: 'heart-circle-outline',
      },
      {id: 2, name: 'Nổi bật', isSelected: false, icon: 'fire'},
      {id: 3, name: 'Đánh giá', isSelected: false, icon: 'star-outline'},
    ],
    filterByPrice: [
      {id: 1, name: 'Khuyến mại', isSelected: false},
      {id: 2, name: 'Bán chạy', isSelected: false},
      {id: 3, name: 'Cao -> Thấp', isSelected: false},
      {id: 4, name: 'Thấp -> Cao', isSelected: false},
    ],
    filterOrder: [],
  },
  detailProduct: {},
  status: 'idle',
  idCheckCart: '',
  listSearch: [],
  message: '',
};
const filtersReducer = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    searchFilterChanged: (state, action) => {
      state.search = action.payload;
    },
    selectIdCategory: (state, action) => {
      state.idCategory = action.payload;
    },
    idProduct: (state, action) => {
      state.idProduct = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },
    checkIdCart: (state, action) => {
      state.idCheckCart = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDetailProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchDetailProduct.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.detailProduct = action.payload.data;
          state.status = 'idle';
        } else {
          state.status = 'loading';
        }
      })
      .addCase(fetchSearch.pending, (state, action) => {
        state.status = 'loading';
        state.listSearch = [];
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        if (action.payload === '') {
          return (state.listSearch = []);
        }
        if (action.payload.success === true) {
          state.listSearch = action.payload.data;
          state.status = 'idle';
        } else {
          state.status = 'idle';
        }
      })
      .addCase(fetchProductForShop.pending, (state, action) => {
        state.status = 'loading';
        state.listSearch = [];
      })
      .addCase(fetchProductForShop.fulfilled, (state, action) => {
        if (action.payload === '') {
          return (state.listSearch = []);
        }
        if (action.payload?.success === true) {
          state.listSearch = action.payload.data;
          state.status = 'idle';
        } else {
          state.status = 'idle';
        }
      });
  },
});
export const fetchDetailProduct = createAsyncThunk(
  'detail/fetchDetail',
  async action => {
    const res = await GetDetailProduct(action);
    return res.data;
  },
);
export const fetchSearch = createAsyncThunk(
  'detail/fetchSearch',
  async text => {
    if (text === '') {
      return '';
    } else {
      const res = await SearchProduct(text);
      return res;
    }
  },
);

export const fetchProductForShop = createAsyncThunk(
  'detail/fetchProductForShop',
  async data => {
    if (data.text === '') {
      return '';
    } else {
      const res = await SeachProductForShop(data?.idShop, data?.keyWords);
      return res;
    }
  },
);
export const {
  searchFilterChanged,
  selectIdCategory,
  idProduct,
  setStatusFilter,
  checkIdCart,
} = filtersReducer.actions;
export default filtersReducer.reducer;
