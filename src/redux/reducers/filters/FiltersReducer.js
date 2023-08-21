import {createSlice} from '@reduxjs/toolkit';
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
  idProduct: '',
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
  },
});

export const {searchFilterChanged,selectIdCategory,idProduct} = filtersReducer.actions
export default filtersReducer.reducer

