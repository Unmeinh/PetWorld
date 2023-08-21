import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    idProduct: 'f3n2p1s7',
    idUser: '123',
    createAt: '14/8/2023',
    amount: 88,
    isSelect: false,
  },
  {
    idProduct: 'o4s8c7z3',
    idUser: '123',
    createAt: '14/8/2023',
    amount: 3,
    isSelect: false,
  },
  {
    idProduct: 'v5w4x3u2',
    idUser: '123',
    createAt: '14/8/2023',
    amount: 3,
    isSelect: false,
  },
];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.push(action.payload);
    },
    plusProduct: (state, action) => {
      const cart = state.find(item => item.idProduct === action.payload);
      if (cart && cart.amount < 99) {
        cart.amount++;
      }
    },
    minusProduct: (state, action) => {
      const index = state.findIndex(item => item.idProduct === action.payload);
      if (index !== -1) {
        if (state[index].amount > 1) {
          state[index].amount--;
        } else {
          state.splice(index, 1);
        }
      }
    },
    selectItem: (state, action) => {
      const selectedIds = action.payload.map(itemAction => itemAction.id);
      state.forEach(item => {
        item.isSelect = selectedIds.includes(item.idProduct);
      });
    },
  },
});

export const { addCart, plusProduct, minusProduct, selectItem } = cartSlice.actions;

export default cartSlice.reducer;
