import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../api/axios.config';


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
      {id: 1, name: 'Cao -> Thấp', isSelected: false},
      {id: 2, name: 'Thấp -> Cao', isSelected: false},
    ],
    filterOrder: [
      {id: 1, name: 'Khuyến mại', isSelected: false},
      {id: 2, name: 'Bán chạy', isSelected: false},
    ],
  },
  detailProduct: {},
  status: 'loading',
  idCheckCart:''
};
const filtersReducer =  createSlice({
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
      state.status = action.payload
    },
    checkIdCart: (state, action) => {
      state.idCheckCart = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchDetailProduct.pending , (state, action) => {
      state.status = 'loading'
    }).addCase(fetchDetailProduct.fulfilled, (state, action) => {
      if (action.payload.success === true) {
        state.detailProduct = action.payload.data;
        state.status = 'idle';
      } else {
        state.status = 'loading';
      }
    })

  }
});
export const fetchDetailProduct = createAsyncThunk('detail/fetchDetail', async (action) => {
  const res = await api.get(`/${action.type === 0 ? 'pet':'product'}/detail/${action.id}`);
  return res.data;
});
export const {searchFilterChanged,selectIdCategory,idProduct,setStatusFilter,checkIdCart} = filtersReducer.actions
export default filtersReducer.reducer

